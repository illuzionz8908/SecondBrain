import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

export const userMiddleware = (req, res, next) => {
  const header = req.headers["authorization"];

  if (!header) {
    return res.status(403).json({
      message: "No token provided, you are not logged in",
    });
  }

  try {
    const decoded = jwt.verify(header, JWT_SECRET);

    if (decoded) {
      req.userId = decoded.id;
      next();
    } else {
      res.status(403).json({
        message: "You are not logged in",
      });
    }
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired token",
    });
  }
};