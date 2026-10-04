export interface Course {
  id: number;
  topic: string;
  instructor: string;
}

export type CourseInput = Omit<Course, "id">;

// In-memory storage: data is lost when the server restarts.
const courses: Course[] = [
  { id: 1, topic: "Math", instructor: "Isaac Newton" },
  { id: 2, topic: "Physics", instructor: "Albert Einstein" },
];

// Ids are never reused, even after a course is deleted.
let lastId = Math.max(0, ...courses.map((course) => course.id));

export function getAllCourses(): Course[] {
  return courses;
}

export function findCourseById(id: number): Course | undefined {
  return courses.find((course) => course.id === id);
}

export function addCourse(input: CourseInput): Course {
  const course: Course = { id: ++lastId, ...input };
  courses.push(course);
  return course;
}

export function updateCourse(course: Course, input: CourseInput): Course {
  course.topic = input.topic;
  course.instructor = input.instructor;
  return course;
}

export function removeCourse(id: number): Course | undefined {
  const index = courses.findIndex((course) => course.id === id);
  if (index === -1) return undefined;
  return courses.splice(index, 1)[0];
}
