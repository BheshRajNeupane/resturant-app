import { 
  IsNotEmpty, 
  IsString, 
  IsEmail, 
  IsOptional, 
  IsBoolean, 
  Matches 
} from 'class-validator';

// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

export class SignupDTO {
  @IsNotEmpty({ message: 'Full name is required.' })
  @IsString({ message: 'Full name must be a string.' })
  fullname: string;

  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  email: string;


  @IsString({ message: 'Contact must be a string.' })
  contact?: string;

 
  // @IsNotEmpty({ message: 'Password is required.' })
  // @Matches(passwordRegex, { message: 'Password must be at least 6 characters long and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.' })
  // password: string;

  @IsNotEmpty({ message: 'Password is required.' })
  password: string;

  
}
