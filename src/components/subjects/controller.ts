import { Response, Request } from 'express';
import subjectsService from './service';
import responseCodes from '../general/responseCodes';
import { iNewSubject, iUpdateSubject } from './interface';

const subjectsController = {
  getAllSubjects: async (req: Request, res: Response) => {
    const subjects = await subjectsService.getAllSubjects();
    return res.status(responseCodes.ok).json({
      subjects,
    });
  },
  getSubjectById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: `Id ${id} is not valid`,
      });
    }
    const subject = await subjectsService.getSubjectById(id);
    if (!subject) {
      return res.status(responseCodes.badRequest).json({
        error: `No subject found with id ${id}`,
      });
    }
    return res.status(responseCodes.ok).json({
      subject,
    });
  },
  createSubject: async (req: Request, res: Response) => {
    const { name, EAP } = req.body;

    const createdBy = res.locals.user.id;
    const newSubject: iNewSubject = {
      name,
      EAP,
      createdBy,
    };

    const id = await subjectsService.createSubject(newSubject);
    if (!id) {
      return res.status(responseCodes.serverError).json({});
    }
    return res.status(responseCodes.created).json({
      id,
    });
  },
  updateSubject: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { name, EAP } = req.body;

    const subject: iUpdateSubject = {
      id,
      name,
      EAP,
    };
    await subjectsService.updateSubject(subject);
    return res.status(responseCodes.noContent).json({
    });
  },
  removeSubject: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: `Id ${id} is not valid`,
      });
    }
    const subject = subjectsService.getSubjectById(id);
    if (!subject) {
      return res.status(responseCodes.badRequest).json({
        error: `Subject not found with id ${id}`,
      });
    }
    await subjectsService.removeSubject(id);
    return res.status(responseCodes.noContent).json({
    });
  },
};

export default subjectsController;
