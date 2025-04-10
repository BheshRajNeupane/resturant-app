import mongoose, { Schema } from 'mongoose';
import { ACTION, ROLE } from '../constant/enum';
import { LEVEL } from '../logger/logger.config';

//collection :hold user actions on the system
export enum STATE {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

const userActionsSchema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  level: {
    type: String,
    enum: Object.values(LEVEL),
    required: true,
  },
  route: {
    type: String,
    required: true,
  },
  metadata: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    action: {
      type: String,
      enum: Object.values(ACTION),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(STATE),
      required: true,
    },
    body: {
      type: Schema.Types.Mixed,
      required: false,
    },
    params: {
      type: Schema.Types.Mixed,
      required: false,
    },
    query: {
      type: Schema.Types.Mixed,
      required: false,
    },
    role: {
      type: String,
      enum: ROLE,
      default: ROLE.ADMIN,
    },
    errorMessage: {
      type: String,
      required: false,
    },
  },
});

const userActions = mongoose.model('user_actions', userActionsSchema);

export default userActions;
