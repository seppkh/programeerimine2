interface Lesson {
  id: number,
  createdBy: number,
  startTime: string | null,
  endTime: string | null,
  duration: null | null,
  courseId: number,
  subjectId: number,
  teacherId: number,
  roomId: number,
  comment: string | null;
}
interface NewLesson {
  createdBy: number,
  startTime: string | null,
  endTime: string | null,
  duration: null | null,
  courseId: number,
  subjectId: number,
  teacherId: number,
  roomId: number,
  comment: string | null;
}
interface UpdateLesson {
  id: number,
  startTime?: string | null,
  endTime?: string | null,
  duration?: null | null,
  courseId?: number,
  subjectId?: number,
  teacherId?: number,
  roomId?: number,
  comment?: string | null;
}

export { Lesson, NewLesson, UpdateLesson };
