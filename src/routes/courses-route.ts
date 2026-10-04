import express from "express";
import coursesController from "../controller/courses-controller";

const router = express.Router();

router.get("/", coursesController.getCourseTopics);
router.get("/:id", coursesController.getCourseById);
router.post("/", coursesController.createCourse);
router.put("/:id", coursesController.updateCourseById);
router.delete("/:id", coursesController.deleteCourseById);

export default router;
