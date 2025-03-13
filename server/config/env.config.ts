import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env') });


export class DotenvConfig {
  static PORT = process.env.PORT 
 static MONGO_URL =process.env.MONGO_URI
}