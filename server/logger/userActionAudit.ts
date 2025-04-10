import { Logger } from '../logger/logger.config';
import { ACTION, ROLE } from '../constant/enum';
import { STATE } from '../models/userAction.model';

type AuditLog = {
  user?: String;
  action: ACTION;
  status: STATE;
  role?: ROLE;
  body?: any;
  params?: any;
  query?: any;
  errorMessage?: String;
};

const formatAuditLog = ({
  user,
  action,
  status,
  role,
  body,
  params,
  query,
  errorMessage,
}: AuditLog) => {
  if (!action || !status) {
    throw new Error('USER or ACTION or STATUS is missing');
  }
  return {
    user,
    action,
    status,
    role,
    body,
    params,
    query,
    errorMessage,
  };
};

const logUserAction = (route: string, metadata: AuditLog) => {
  const formattedLog = formatAuditLog(metadata);

  if (formattedLog) {
    Logger.info(route, { metadata: formattedLog });
  } else {
    console.error('Invalid log data, skipping...');
  }
};

export { logUserAction };
