import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import teachersService from './service';

const teachersController = {
  getAllTeachers: (req: Request, res: Response) => {
    const teachers = teachersService.getAllTeachers();
    res.status(responseCodes.ok).json({
      teachers,
    });
  },
  getTeacherById: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: `Id ${id} is not valid`,
      });
    }
    const teacher = teachersService.getTeacherById(id);
    if (!teacher) {
      return res.status(responseCodes.badRequest).json({
        error: `No teacher found with id ${id}`,
      });
    }
    return res.status(responseCodes.ok).json({
      teacher,
    });
  },
  createTeacher: (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) {
      return res.status(responseCodes.badRequest).json({
        error: 'Name is required',
      });
    }
    const id = teachersService.createTeacher(name);
    return res.status(responseCodes.created).json({
      id,
    });
  },
  updateTeacher: (req: Request, res: Response) => {
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
    teachersService.updateTeacher(id, name);
    return res.status(responseCodes.noContent).json({
    });
  },
  removeTeacher: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: `Id ${id} is not valid`,
      });
    }
    const teacher = teachersService.getTeacherById(id);
    if (!teacher) {
      return res.status(responseCodes.badRequest).json({
        error: `Teachers not found with id ${id}`,
      });
    }
    teachersService.removeTeacher(id);
    return res.status(responseCodes.noContent).json({
    });
  },
};

export default teachersController;
