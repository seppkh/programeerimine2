import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import teachersService from './service';
import { iNewTeacher, iUpdateTeacher } from './interface';

const teachersController = {
  getAllTeachers: async (req: Request, res: Response) => {
    const teachers = await teachersService.getAllTeachers();
    res.status(responseCodes.ok).json({
      teachers,
    });
  },
  getTeacherById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    const teacher = await teachersService.getTeacherById(id);
    if (!teacher || teacher.length === 0) {
      return res.status(responseCodes.badRequest).json({
        error: `No teacher found with id ${id}`,
      });
    }
    return res.status(responseCodes.ok).json({
      teacher,
    });
  },
  createTeacher: async (req: Request, res: Response) => {
    const { name } = req.body;

    const createdBy = res.locals.user.id;
    const newTeacher: iNewTeacher = {
      name,
      createdBy,
    };
    const id = await teachersService.createTeacher(newTeacher);

    if (!id) {
      return res.status(responseCodes.serverError).json({});
    }
    return res.status(responseCodes.created).json({
      id,
    });
  },
  updateTeacher: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { name } = req.body;

    const teacher: iUpdateTeacher = {
      id,
      name,
    };
    const result = await teachersService.updateTeacher(teacher);
    return res.status(responseCodes.ok).json({
      result,
    });
  },
  removeTeacher: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    const item = await teachersService.getTeacherById(id);
    if (!item || item.length === 0) {
      return res.status(responseCodes.badRequest).json({
        error: `No teacher found with id ${id}`,
      });
    }
    const result = await teachersService.removeTeacher(id);
    return res.status(responseCodes.ok).json({
      result,
    });
  },
};

export default teachersController;
