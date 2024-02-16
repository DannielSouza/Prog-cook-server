import { register } from "../controller/authController";
import express from "express";
import multer from "multer";

const router = express.Router();
const upload = multer();

router.post("/register", upload.array("image"), register);

export default router;
