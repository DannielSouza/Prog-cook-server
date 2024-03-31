import { findUserByEmail } from "../controller/userByEmail/userByEmailController";
import { login } from "../controller/signin/signinController";
import { register } from "../controller/signup/signupController";
import express from "express";
import multer from "multer";

const router = express.Router();
const upload = multer();

router.post("/register", upload.array("image"), register);
router.post("/login", login);
router.get("/", findUserByEmail);

export default router;
