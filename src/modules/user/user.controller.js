import { Router } from "express";
import { userSignUp, loginUser, getUserProfile } from "./user.service.js";
import { auth } from "../../middlewares/auth.middleware.js";
const router = Router();
router.post("/signup", async (req, res) => {
  try {
    const user = await userSignUp(req.body);
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});
router.post("/login", async (req, res) => {
  try {
    const data = await loginUser(req.body.email, req.body.password);
    res.json(data);
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
});
router.get("/me", auth, async (req, res) => {
  const user = await getUserProfile(req.user._id);
  res.json(user);
});
export default router;