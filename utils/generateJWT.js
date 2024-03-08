import jwt from "jsonwebtoken";
export default async (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "14d",
  });
  return token;
};
