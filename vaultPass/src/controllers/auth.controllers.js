const User = require("../models/user.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ActivityLog = require("../models/activityLog.models");

const MAX_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000;      
const ATTEMPT_WINDOW = 10 * 60 * 1000; 

const register = async (req, res) => {
  const { fullName, email, password, role } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    const userResponse = {
      id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      role: newUser.role,
    };

    return res.status(201).json({ message: "User registered successfully", user: userResponse });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

   
    if (user.isLocked()) {
      const minutesLeft = Math.ceil((user.lockUntil - Date.now()) / 60000);
      return res.status(403).json({
        message: `Account locked. Try again in ${minutesLeft} minute(s).`,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      const now = Date.now();

  
      const windowExpired =
        !user.lastFailedLogin ||
        now - user.lastFailedLogin.getTime() > ATTEMPT_WINDOW;

      user.failedLoginAttempts = windowExpired ? 1 : user.failedLoginAttempts + 1;
      user.lastFailedLogin = now;

   
      if (user.failedLoginAttempts >= MAX_ATTEMPTS) {
        user.lockUntil = new Date(now + LOCK_TIME);
      }

      await user.save();

      await ActivityLog.create({
        action: "FAILED_LOGIN",
        user: user._id,
        ipAddress: req.ip,
      });

      return res.status(400).json({ message: "Invalid email or password" });
    }

    
    user.failedLoginAttempts = 0;
    user.lastFailedLogin = undefined;
    user.lockUntil = undefined;
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const userResponse = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      token: token,
    };

    return res.status(200).json({ message: "User signed in successfully", userResponse });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { register, login };