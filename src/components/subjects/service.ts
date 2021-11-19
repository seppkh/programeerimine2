import db from '../../db';
import Subject from './interface';

const subjectsService = {
  getAllSubjects: (): Subject[] => {
    const { subjects } = db;
    return subjects;
  },
  getSubjectById: (id: number): Subject | undefined => {
    const subject = db.subjects.find((element) => element.id === id);
    return subject;
  },
  createSubject: (name: string, EAP: number): number => {
    const id = db.subjects[db.subjects.length - 1].id + 1;
    db.subjects.push({
      id,
      name,
      EAP,
    });
    return id;
  },
  updateSubject: (id: number, name?: string, EAP?: number): boolean => {
    const index = db.subjects.findIndex((element) => element.id === id);
    if (name) {
      db.subjects[index].name = name;
    }
    if (EAP) {
      db.subjects[index].EAP = EAP;
    }
    return true;
  },
  removeSubject: (id: number): boolean => {
    const index = db.subjects.findIndex((element) => element.id === id);
    db.subjects.splice(index, 1);
    return true;
  },

};

export default subjectsService;
