// import jwt from "jsonwebtoken";
// import * as errors from "../../../errors/errors.js";

// export default function (req, res, next) {

//   const authHeader = req.headers

//   const token = req.cookies["authToken"];
//   if (!token)
//     return res
//       .status(401)
//       .json({ message: "Access denied. No token provided." });

//   try {
//     const decoded = jwt.verify(token, "Mysecret");
//     req.user = decoded;
//     next();
//   } catch (err) {
//     throw new errors.UnauthorizedError("Invalid token");
//   }
// }
import jwt from "jsonwebtoken";
import * as errors from "../../../errors/errors.js";

const authFarmer = (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7);
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "Mysecret");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token.",
    });
  }
};

export default authFarmer;
