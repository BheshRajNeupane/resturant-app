declare namespace Express {
  export interface Request {
    userId?: string;
    role?: string;
   
  }
}

// types/express/index.d.ts

// declare namespace Express {
//   export interface User {
//     id: string;
//     email?: string;
//     role?: string;
//   }

//   export interface Request {
//     user?: User;      // For passport session
//     userId?: string;  // For JWT-based auth
//     role?: string;    // Optional for JWT
//   }
// }

//simlar for both

// declare namespace Express {
//   export interface Request {
//     user?: {
//       id?: string;
//       role?: string;
//       organization_id?: string;
//     };
//   }
// }

