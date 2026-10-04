import { Request, Response } from "express";
import {
  CourseInput,
  addCourse,
  findCourseById,
  getAllCourses,
  removeCourse,
  updateCourse,
} from "../models/courses.model";

const MIN_LENGTH = 3;

type ParseResult = { value: CourseInput } | { error: string };

// Validates the request body. req.body is undefined in Express 5 when no body was sent.
function parseCourseInput(body: unknown): ParseResult {
  const { topic, instructor } = (body ?? {}) as Record<string, unknown>;

  if (typeof topic !== "string" || topic.trim().length < MIN_LENGTH) {
    return { error: `topic is required and must be at least ${MIN_LENGTH} characters.` };
  }
  if (typeof instructor !== "string" || instructor.trim().length < MIN_LENGTH) {
    return { error: `instructor is required and must be at least ${MIN_LENGTH} characters.` };
  }
  return { value: { topic: topic.trim(), instructor: instructor.trim() } };
}

const getCourseTopics = (_req: Request, res: Response) => {
  res.send(getAllCourses().map((course) => course.topic));
};

const getCourseById = (req: Request, res: Response) => {
  const course = findCourseById(Number(req.params.id));
  if (!course) {
    res.status(404).send("Invalid ID.");
    return;
  }
  res.send(course);
};

const createCourse = (req: Request, res: Response) => {
  const parsed = parseCourseInput(req.body);
  if ("error" in parsed) {
    res.status(400).send(parsed.error);
    return;
  }
  res.status(201).send(addCourse(parsed.value));
};

const updateCourseById = (req: Request, res: Response) => {
  const course = findCourseById(Number(req.params.id));
  if (!course) {
    res.status(404).send("Invalid ID.");
    return;
  }

  const parsed = parseCourseInput(req.body);
  if ("error" in parsed) {
    res.status(400).send(parsed.error);
    return;
  }
  res.send(updateCourse(course, parsed.value));
};

const deleteCourseById = (req: Request, res: Response) => {
  const course = removeCourse(Number(req.params.id));
  if (!course) {
    res.status(404).send("Invalid ID.");
    return;
  }
  res.send(course);
};

export default {
  getCourseTopics,
  getCourseById,
  createCourse,
  updateCourseById,
  deleteCourseById,
};
