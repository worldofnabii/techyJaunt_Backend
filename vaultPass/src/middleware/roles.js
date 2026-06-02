// this does "do you have the permissinon"

// the part where Implement role-based access control was stated

const ActivityLog = require("../models/activityLog.models");

const roles = (...allowedRoles) => {
  return async (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      await ActivityLog.create({
        action: "FORBIDDEN_ACCESS",
        user: req.user._id,
        ipAddress: req.ip,
      });

      return res.status(403).json({ message: "Access denied. Insufficient permissions." });
    }

    next();
  };
};

module.exports = roles;