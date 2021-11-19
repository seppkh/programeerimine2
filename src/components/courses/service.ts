import db from '../../db';
import Course from './interface';

const coursesService = {
  getAllCourses: (): Course[] => {
    const { courses } = db;
    return courses;
  },
  getCourseById: (id: number): Course | undefined => {
    const course = db.courses.find((element) => element.id === id);
    return course;
  },
  createCourse: (name: string): number => {
    const id = db.courses[db.courses.length - 1].id + 1;
    db.courses.push({
      id,
      name,
    });
    return id;
  },
  updateCourse: (id: number, name: string): boolean => {
    const index = db.courses.findIndex((element) => element.id === id);
    db.courses[index].name = name;
    return true;
  },
  removeCourse: (id: number): boolean => {
    const index = db.courses.findIndex((element) => element.id === id);
    db.courses.splice(index, 1);
    return true;
  },
};

export default coursesService;
