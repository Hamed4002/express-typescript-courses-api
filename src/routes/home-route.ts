import express from "express";
import homeController from "../controller/home-controller";

const router = express.Router();

router.get("/", homeController.getHome);

export default router;
