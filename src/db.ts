import { User } from './components/users/interface';
import Course from './components/courses/interface';
import Teacher from './components/teachers/interface';
import Subject from './components/subjects/interface';
import Room from './components/rooms/interface';
import { Lesson } from './components/lessons/interface';

/**
  * Database interface
  */
interface Db {
  users: User[];
  courses: Course[];
  subjects: Subject[];
  teachers: Teacher[];
  rooms: Room[];
  lessons: Lesson[];
}

/**
  * Database
  */
const db: Db = {
  users: [
    {
      id: 1,
      firstName: 'Juku',
      lastName: 'Juurikas',
      email: 'juku@juurikas.ee',
      password: '$2b$10$nu/BtcSMvBDqF2l14ZnXrebbR0q63g.l.UoEddgRzNAeWKr8YA8cK',
      role: 'Admin',
    },
    {
      id: 2,
      firstName: 'Mari',
      lastName: 'Maasikas',
      email: 'mari@maasikas.ee',
      password: '$2b$10$I/pRBg1QTpvwXRjm./b5F.iByImcn8DNQmOos5Oom/PQ7W9d4t3ra',
      role: 'User',
    },
  ],
  courses: [
    {
      id: 1,
      name: 'Liikluskorraldus1',
    },
    {
      id: 2,
      name: 'Rakendusinformaatika2',
    },
    {
      id: 3,
      name: 'Käsitöö1',
    },
  ],
  subjects: [
    {
      id: 1,
      name: 'Erialane inglise keel',
      EAP: 6,
    },
    {
      id: 2,
      name: 'Programmeerimine II',
      EAP: 3,
    },
    {
      id: 3,
      name: 'IT ja Õigus',
      EAP: 4,
    },
  ],
  teachers: [
    {
      id: 1,
      name: 'Mari Kuli',
    },
    {
      id: 2,
      name: 'Laura Hein',
    },
    {
      id: 3,
      name: 'Martti Raavel',
    },
  ],
  rooms: [
    {
      id: 1,
      name: 'Arvutiklass 203',
    },
    {
      id: 2,
      name: 'Auditoorium 307',
    },
  ],
  lessons: [
    {
      id: 1,
      createdBy: 1,
      startTime: null,
      endTime: null,
      duration: null,
      courseId: 2,
      subjectId: 1,
      teacherId: 1,
      roomId: 1,
      comment: null,
    },
    {
      id: 2,
      createdBy: 1,
      startTime: null,
      endTime: null,
      duration: null,
      courseId: 2,
      subjectId: 3,
      teacherId: 3,
      roomId: 2,
      comment: null,
    },
  ],
};

export default db;
