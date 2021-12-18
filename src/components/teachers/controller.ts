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
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: `Id ${id} is not valid`,
      });
    }
    const teacher = await teachersService.getTeacherById(id);
    if (!teacher) {
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
    if (!name) {
      return res.status(responseCodes.badRequest).json({
        error: 'Name is required',
      });
    }
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
    const teacher: iUpdateTeacher = {
      id,
      name,
    };
    await teachersService.updateTeacher(teacher);
    return res.status(responseCodes.noContent).json({
    });
  },
  removeTeacher: async (req: Request, res: Response) => {
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
    await teachersService.removeTeacher(id);
    return res.status(responseCodes.noContent).json({
    });
  },
};

export default teachersController;
