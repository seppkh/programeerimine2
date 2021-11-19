import { Response, Request } from 'express';
import subjectsService from './service';
import responseCodes from '../general/responseCodes';

const subjectsController = {
  getAllSubjects: (req: Request, res: Response) => {
    const subjects = subjectsService.getAllSubjects();
    return res.status(responseCodes.ok).json({
      subjects,
    });
  },
  getSubjectById: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: `Id ${id} is not valid`,
      });
    }
    const subject = subjectsService.getSubjectById(id);
    if (!subject) {
      return res.status(responseCodes.badRequest).json({
        error: `No subject found with id ${id}`,
      });
    }
    return res.status(responseCodes.ok).json({
      subject,
    });
  },
  createSubject: (req: Request, res: Response) => {
    const { name, EAP } = req.body;
    if (!name) {
      return res.status(responseCodes.badRequest).json({
        error: 'Name is required',
      });
    }
    if (!EAP) {
      return res.status(responseCodes.badRequest).json({
        error: 'EAP is required',
      });
    }
    const id = subjectsService.createSubject(name, EAP);
    return res.status(responseCodes.created).json({
      id,
    });
  },
  updateSubject: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: `Id ${id} is not valid`,
      });
    }
    const { name, EAP } = req.body;
    if (!name && !EAP) {
      return res.status(responseCodes.badRequest).json({
        error: 'Nothing to update',
      });
    }
    subjectsService.updateSubject(id, name, EAP);
    return res.status(responseCodes.noContent).json({
    });
  },
  removeSubject: (req: Request, res: Response) => {
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
    subjectsService.removeSubject(id);
    return res.status(responseCodes.noContent).json({
    });
  },
};

export default subjectsController;
