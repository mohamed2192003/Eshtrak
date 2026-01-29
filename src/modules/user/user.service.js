import User from "../../database/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const userSignUp = async (userData) => {
  const { email, password } = userData;
  const isExist = await User.findOne({ email });
  if (isExist) throw new Error("Email already exists");
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    ...userData,
    password: hashedPassword,
  });
  return {
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
  };
};
export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email or password");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");
  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  return {
    token,
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    },
  };
};
export const getUserProfile = async (userId) => {
  return await User.findById(userId).select("-password");
};