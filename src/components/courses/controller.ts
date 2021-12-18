import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import { iNewCourse, iUpdateCourse } from './interface';
import coursesService from './service';

const coursesController = {
  getAllCourses: async (req: Request, res: Response) => {
    const courses = await coursesService.getAllCourses();
    res.status(responseCodes.ok).json({
      courses,
    });
  },
  getCourseById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: `Id ${id} is not valid`,
      });
    }
    const course = await coursesService.getCourseById(id);
    if (!course) {
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
    if (!name) {
      return res.status(responseCodes.badRequest).json({
        error: 'Name is required',
      });
    }
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
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: `Id ${id} is not valid`,
      });
    }
    const { name } = req.body;
    if (!name) {
      return res.status(responseCodes.badRequest).json({
        error: 'Nothing to update',
      });
    }
    const course: iUpdateCourse = {
      id,
      name,
    };
    await coursesService.updateCourse(course);
    return res.status(responseCodes.noContent).json({
    });
  },
  removeCourse: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: `Id ${id} is not valid`,
      });
    }
    const course = coursesService.getCourseById(id);
    if (!course) {
      return res.status(responseCodes.badRequest).json({
        error: `Courses not found with id ${id}`,
      });
    }
    await coursesService.removeCourse(id);
    return res.status(responseCodes.noContent).json({
    });
  },
};

export default coursesController;
