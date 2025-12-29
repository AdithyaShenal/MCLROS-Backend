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

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new errors.UnauthorizedError("Access denied. No token provided.");
  }

  const token = authHeader.substring(7); // Remove 'Bearer ' prefix

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "Mysecret");
    req.user = decoded;
    next();
  } catch (error) {
    throw new errors.UnauthorizedError("Invalid token.");
  }
};

export default authFarmer;
