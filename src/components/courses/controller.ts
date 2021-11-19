import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import coursesService from './service';

const coursesController = {
  getAllCourses: (req: Request, res: Response) => {
    const courses = coursesService.getAllCourses();
    res.status(responseCodes.ok).json({
      courses,
    });
  },
  getCourseById: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: `Id ${id} is not valid`,
      });
    }
    const course = coursesService.getCourseById(id);
    if (!course) {
      return res.status(responseCodes.badRequest).json({
        error: `No course found with id ${id}`,
      });
    }
    return res.status(responseCodes.ok).json({
      course,
    });
  },
  createCourse: (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) {
      return res.status(responseCodes.badRequest).json({
        error: 'Name is required',
      });
    }
    const id = coursesService.createCourse(name);
    return res.status(responseCodes.created).json({
      id,
    });
  },
  updateCourse: (req: Request, res: Response) => {
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
    coursesService.updateCourse(id, name);
    return res.status(responseCodes.noContent).json({
    });
  },
  removeCourse: (req: Request, res: Response) => {
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
    coursesService.removeCourse(id);
    return res.status(responseCodes.noContent).json({
    });
  },
};

export default coursesController;
