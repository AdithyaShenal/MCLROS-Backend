import jwt from "jsonwebtoken";
import * as errors from "../../../errors/errors.js";

export default function (req, res, next) {
  const token = req.cookies["authToken"];
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, "Mysecret");
    req.user = decoded;
    next();
  } catch (err) {
    throw new errors.UnauthorizedError("Invalid token");
  }
}
