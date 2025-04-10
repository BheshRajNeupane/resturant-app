import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env') });


export class DotenvConfig {
  static PORT = process.env.PORT 
 static MONGO_URL =process.env.MONGO_URI
 static NODE_ENV = process.env.NODE_ENV
 static JWT_SECRET = process.env.JWT_SECRET
 static JWT_TOKEN_EXPIRE = process.env.JWT_TOKEN_EXPIRE
}