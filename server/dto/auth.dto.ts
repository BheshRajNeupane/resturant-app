import { 
  IsNotEmpty, 
  IsString, 
  IsEmail, 
  IsOptional, 
  IsBoolean, 
  Matches ,
  Length,
  MaxLength,
  IsPhoneNumber
} from 'class-validator';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;



export class SignupDTO {
  @MaxLength(50, { message: 'Full name must be at most 50 characters long.' })
  @IsNotEmpty({ message: 'Full name is required.' })
  @IsString({ message: 'Full name must be a string.' })
  fullname: string;

  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  email: string;

  @IsString({ message: 'Invalid contact numbe.' })
  // @IsPhoneNumber(undefined, { message: 'Invalid contact number' })
  contact?: string;


 
  @IsNotEmpty({ message: 'Password is required.' })
  @Matches(passwordRegex, { message: 'Password must be at least 6 characters long and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.' })
  password: string;

  // @IsNotEmpty({ message: 'Password is required.' })
  // password: string;

  
}
export class LoginDTO {
 
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  email: string;

  @IsNotEmpty({ message: 'Password is required.' })
  password: string;

  @IsNotEmpty({ message: 'Captcha is required.' })
  @IsString({ message: 'Captcha must be a string.' })
  captcha: string;


  // @IsNotEmpty({ message: 'Password is required.' })
  // @Matches(passwordRegex, { message: 'Password must be at least 6 characters long and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.' })
  // password: string;

  

  
}
export class VerifyEmailDto {
  @IsString()
  // @Length(6, { message: 'Verification code must be exactly 6 characters long' })
  @Matches(/^[a-zA-Z0-9]+$/, { message: 'Verification code must be alphanumeric' })
  code: string;
}



export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  fullname?: string;


  @IsEmail({}, { message: 'Invalid email address' })
  email?: string;

  // @IsPhoneNumber(undefined, { message: 'Invalid contact number' })
  @IsOptional()
  @IsString()
  contact?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  city?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  country?: string;

  @IsOptional()
  @IsString()
  profilePicture?: string; // You can validate file format on the client or with regex if needed
}
