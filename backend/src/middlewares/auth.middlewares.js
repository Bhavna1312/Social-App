import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

// Added 'async' here!
export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    // Added the catch block to prevent the server from hanging
    return res.status(401).json({ message: "Invalid token" });
  }
};
