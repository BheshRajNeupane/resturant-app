import { NextFunction, Request, Response } from 'express';
import { logUserAction } from './userActionAudit';
import { ACTION, ROLE } from '../constant/enum';
import { STATE } from '../models/userAction.model';

/**
 * Detect HTTP method and map to ACTION enum
 */
const getActionFromMethod = (method: string): ACTION => {
  switch (method.toLowerCase()) {
    case 'post':
      return ACTION.CREATE;
    case 'put':
    case 'patch':
      return ACTION.UPDATE;
    case 'delete':
      return ACTION.DELETE;
    case 'get':
      return ACTION.VIEW;
    default:
      return ACTION.VIEW;
  }
};

/**
 * Audit Logger Middleware (Success Case)
 */
export const auditLoggerSuccess = (req: Request, res: Response, next: NextFunction): void => {
  const { password, ...rest } = req.body;
  res.on('finish', () => {
    // only log if success response
    if (res.statusCode < 400) {
      const route = req.originalUrl.split('?')[0];
      const action = getActionFromMethod(req.method);

      logUserAction(route, {
        user: req?.user?.id || 'n/a',
        action,
        status: STATE.SUCCESS,
        role: (req.user?.role as ROLE) || undefined,
        body: rest,
        params: req.params,
        query: req.query,
      });
    }
  });
  next();
};

/**
 * Audit Logger Middleware (Error Case)
 */
export const auditLoggerError = (err: any, req: Request, res: Response, next: NextFunction): void => {
  const route = req.originalUrl.split('?')[0];
  const { password, ...rest } = req.body;

  const action = getActionFromMethod(req.method);

  logUserAction(route, {
    user: req?.user?.id || 'n/a',
    action,
    status: STATE.FAILED,
    role: (req.user?.role as ROLE) || undefined,
    body: rest,
    params: req.params,
    query: req.query,
    errorMessage: err?.message || 'Unknown Error',
  });

  
  next(err);
};
