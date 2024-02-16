import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import admin from "firebase-admin";
const serviceAccount = require("C:/Users/danfe/Documents/projectCookV2/progCookV2/server/firebaseAuth.json");

// FIREBASE CONFIG
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: serviceAccount.storageBucket,
});

const app = express();

// CONFIG
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err}`,
    });
  }
);

// ROUTES
app.use("/auth", authRoutes);

export { app };
