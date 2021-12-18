import { dbUser } from './components/users/interface';
import { dbCourse } from './components/courses/interface';
import { dbTeacher } from './components/teachers/interface';
import { dbSubject } from './components/subjects/interface';
import { dbRoom } from './components/rooms/interface';
import { Lesson } from './components/lessons/interface';

/**
  * Database interface
  */
interface Db {
  users: dbUser[];
  courses: dbCourse[];
  subjects: dbSubject[];
  teachers: dbTeacher[];
  rooms: dbRoom[];
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
      createdBy: 1,
    },
    {
      id: 2,
      name: 'Rakendusinformaatika2',
      createdBy: 1,
    },
    {
      id: 3,
      name: 'Käsitöö1',
      createdBy: 1,
    },
  ],
  subjects: [
    {
      id: 1,
      name: 'Erialane inglise keel',
      EAP: 6,
      createdBy: 1,
    },
    {
      id: 2,
      name: 'Programmeerimine II',
      EAP: 3,
      createdBy: 1,
    },
    {
      id: 3,
      name: 'IT ja Õigus',
      EAP: 4,
      createdBy: 1,
    },
  ],
  teachers: [
    {
      id: 1,
      name: 'Mari Kuli',
      createdBy: 1,
    },
    {
      id: 2,
      name: 'Laura Hein',
      createdBy: 1,

    },
    {
      id: 3,
      name: 'Martti Raavel',
      createdBy: 1,

    },
  ],
  rooms: [
    {
      id: 1,
      name: 'Arvutiklass 203',
      createdBy: 1,
    },
    {
      id: 2,
      name: 'Auditoorium 307',
      createdBy: 1,
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
