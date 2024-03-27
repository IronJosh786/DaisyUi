import { User } from "../models/user.model.js";
import { z } from "zod";

const options = {
  httpOnly: true,
  secure: true,
  sameSite: true,
};

const generateAccessAndRefreshToken = async (id) => {
  const user = await User.findById(id);

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};

const registerData = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  username: z
    .string()
    .min(4, { message: "Username must be at least 3 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const registerUser = async (req, res) => {
  const { success, error } = registerData.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ message: error.errors[0].message });
  }

  const { email, username, password } = req.body;

  const isPresent = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (isPresent) {
    return res.status(400).json({ message: "Email/Username already taken" });
  }

  const newUser = await User.create({
    email,
    username,
    password,
  });

  if (!newUser) {
    return res.status(400).json({ message: "Could not create the user" });
  }

  return res
    .status(200)
    .json({ message: "User created successfully", data: newUser });
};

const loginData = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const loginUser = async (req, res) => {
  const { success, error } = loginData.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ message: error.errors[0].message });
  }

  const { email, password } = req.body;

  const isPresent = await User.findOne({ email });

  if (!isPresent) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordCorrect = await isPresent.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    return res.status(404).json({ message: "Incorrect password" });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    isPresent._id
  );

  const user = await User.findById(isPresent._id).select(
    "-refreshToken -password"
  );

  return res.status(200).json({
    message: "User logged in successfully",
    data: { user, accessToken },
  });
};

const getCurrentUser = async (req, res) => {
  return res
    .status(200)
    .json({ message: "Fetched data successfully", data: req.user });
};

const logoutUser = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    { new: true }
  );

  return res.status(200).json({ message: "User logged out" });
};

const checkAuth = async (req, res) => {
  return res.status(200).json({ message: "User is logged in" });
};

export { registerUser, loginUser, getCurrentUser, logoutUser, checkAuth };
