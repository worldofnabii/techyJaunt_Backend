//Suggested fields:

//action user ipAddress timestamp



const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      enum: ["FAILED_LOGIN", "FORBIDDEN_ACCESS", "ACCOUNT_DELETED"],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    ipAddress: {
      type: String,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true, versionKey: false }
);

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);

module.exports = ActivityLog;