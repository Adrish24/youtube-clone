import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export async function authorization(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized access!" });
  }

  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded?.id).select("-password"); // Exclude password from the user object
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    req.user = user; // Attach the user to the request object

    next();
  } catch (error) {
    console.log(error);
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired. Please login again." });
    }
    return res.status(500).json({ message: error.message });
  }
}
