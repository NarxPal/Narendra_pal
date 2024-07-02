import express from "express";
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const router = express.Router();

const secretKey = crypto.randomBytes(32).toString("hex");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASS,
  },
});

router.post("/send-code", async (req, res) => {
  const { email } = req.body;
  if (email !== process.env.MY_EMAIL_USER) {
    return res.status(403).send("Unauthorized");
  } else {
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const token = jwt.sign({ code: verificationCode }, secretKey, {
      expiresIn: "10m",
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Verification Code",
      text: `Your verification code is ${verificationCode}`,
    });

    res.json({ token });
  }
});

router.post("/verify-code", async (req, res) => {
  const { token, code } = req.body;
  try {
    const decoded = jwt.verify(token, secretKey);
    if (decoded.code === code) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: "Invalid code" });
    }
  } catch (err) {
    res
      .status(401)
      .json({ success: false, message: "Token expired or invalid" });
  }
});

export default router;
