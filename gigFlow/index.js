const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

const port = process.env.PORT;
const dbUrl = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};



const providerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    skillCategory: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    address: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Provider = mongoose.model("Provider", providerSchema);


app.post("/providers", async (req, res) => {
  const { fullName, email, phoneNumber, skillCategory, gender, address } = req.body;

  try {
    if (!fullName || !email || !phoneNumber) {
      return res.status(400).json({ message: "fullName, email, and phoneNumber are required" });
    }

   
    const existing = await Provider.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "Profile already exists with this email." });
    }

    const newProvider = new Provider({ fullName, email, phoneNumber, skillCategory, gender, address });
    await newProvider.save();
    return res.status(201).json({ message: "Provider added successfully", provider: newProvider });
  } catch (error) {
    console.error("Error adding provider:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


app.get("/providers", async (req, res) => {
  const { skill } = req.query;

  try {
    const filter = skill ? { skillCategory: { $regex: skill, $options: "i" } } : {};
    const providers = await Provider.find(filter);
    return res.status(200).json({ providers });
  } catch (error) {
    console.error("Error fetching providers:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


app.get("/providers/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const provider = await Provider.findById(id);
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }
    return res.status(200).json({ provider });
  } catch (error) {
    console.error("Error fetching provider:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


app.patch("/providers/:id", async (req, res) => {
  const { id } = req.params;
  const { fullName, email, phoneNumber, skillCategory, gender, address } = req.body;

  try {
    const updatedProvider = await Provider.findByIdAndUpdate(
      id,
      { fullName, email, phoneNumber, skillCategory, gender, address },
      { new: true, runValidators: true }
    );
    if (!updatedProvider) {
      return res.status(404).json({ message: "Provider not found" });
    }
    return res.status(200).json({ message: "Provider updated successfully", provider: updatedProvider });
  } catch (error) {
    console.error("Error updating provider:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


app.patch("/providers/:id/verify", async (req, res) => {
  const { id } = req.params;

  try {
    const provider = await Provider.findByIdAndUpdate(
      id,
      { isVerified: true },
      { new: true }
    );
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }
    return res.status(200).json({ message: "Provider verified successfully", provider });
  } catch (error) {
    console.error("Error verifying provider:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


app.delete("/providers/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Provider.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Provider not found" });
    }
    return res.status(200).json({ message: "Provider deleted successfully" });
  } catch (error) {
    console.error("Error deleting provider:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong on the server" });
});



app.listen(port, () => {
  connectDB();
  console.log(`GigFlow server is running on port ${port}`);
});