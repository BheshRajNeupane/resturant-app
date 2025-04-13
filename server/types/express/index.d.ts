declare namespace Express {
  export interface Request {
    userId?: string;
    role?: string;
   
  }
}

// import session from "express-session";

// declare module "express-session" {
//   interface SessionData {
//     user_id?: string; // or number if you're using numbers
//   }
// }
