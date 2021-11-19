import db from '../../db';
import Teacher from './interface';

const teachersService = {
  getAllTeachers: (): Teacher[] => {
    const { teachers } = db;
    return teachers;
  },
  getTeacherById: (id: number): Teacher | undefined => {
    const teacher = db.teachers.find((element) => element.id === id);
    return teacher;
  },
  createTeacher: (name: string): number => {
    const id = db.teachers[db.teachers.length - 1].id + 1;
    db.teachers.push({
      id,
      name,
    });
    return id;
  },
  updateTeacher: (id: number, name: string): boolean => {
    const index = db.teachers.findIndex((element) => element.id === id);
    db.teachers[index].name = name;
    return true;
  },
  removeTeacher: (id: number): boolean => {
    const index = db.teachers.findIndex((element) => element.id === id);
    db.teachers.splice(index, 1);
    return true;
  },
};

export default teachersService;
