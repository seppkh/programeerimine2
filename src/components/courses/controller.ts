import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import coursesService from './service';
import { iNewCourse, iUpdateCourse } from './interface';

const coursesController = {
  getAllCourses: async (req: Request, res: Response) => {
    const courses = await coursesService.getAllCourses();
    res.status(responseCodes.ok).json({
      courses,
    });
  },
  getCourseById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    const course = await coursesService.getCourseById(id);
    if (!course || course.length === 0) {
      return res.status(responseCodes.badRequest).json({
        error: `No course found with id ${id}`,
      });
    }
    return res.status(responseCodes.ok).json({
      course,
    });
  },
  createCourse: async (req: Request, res: Response) => {
    const { name } = req.body;

    const createdBy = res.locals.user.id;
    const newCourse: iNewCourse = {
      name,
      createdBy,
    };
    const id = await coursesService.createCourse(newCourse);

    if (!id) {
      return res.status(responseCodes.serverError).json({});
    }
    return res.status(responseCodes.created).json({
      id,
    });
  },
  updateCourse: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { name } = req.body;

    const course: iUpdateCourse = {
      id,
      name,
    };
    const result = await coursesService.updateCourse(course);
    return res.status(responseCodes.ok).json({
      result,
    });
  },
  removeCourse: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    const item = await coursesService.getCourseById(id);
    if (!item || item.length === 0) {
      return res.status(responseCodes.badRequest).json({
        error: `No course found with id ${id}`,
      });
    }
    const result = await coursesService.removeCourse(id);
    return res.status(responseCodes.ok).json({
      result,
    });
  },
};

export default coursesController;
