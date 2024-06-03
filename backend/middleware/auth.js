// import jwt from 'jsonwebtoken';


// const auth = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     const token = authHeader.split(' ')[1];
//     jwt.verify(token, "secretKey", (err, user) => {
//       console.log(token + " token in auth");
//       if (err) {
//         console.log("Token verification failed:", err);
//         return res.sendStatus(403); // Forbidden
//       }
//       req.user = user;
//       next();
//     });
//   } else {
//     res.sendStatus(401); // Unauthorized
//   }
// };

// export default auth;


import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader," in auth code ");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Token not found. Please log in again." });
  }

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, "secretKey");
   console.log(decoded, " decoded");
  try {
    const decoded = jwt.verify(token, "secretKey");
    req.userId = decoded.userId;
    console.log("before next")
    next();
    console.log("after next")

  } catch (error) {
    console.error("Authentication error:", error);
    return res
      .status(401)
      .json({ message: "Invalid token. Please log in again." });
  }
};

export default auth;