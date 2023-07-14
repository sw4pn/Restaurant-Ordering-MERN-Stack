import jwt from "jsonwebtoken";

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
};

export default generateRefreshToken;
