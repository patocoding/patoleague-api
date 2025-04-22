import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, MinLength, IsNotEmpty, Matches, IsEmail } from 'class-validator';


const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;
  
export class UpdateUserDto extends PartialType(CreateUserDto) {

      @IsString()
      @MinLength(2, { message: 'Name must have atleast 2 characters.' })
      @IsNotEmpty()
      fullName: string;
    
      @IsNotEmpty()
      @Matches(passwordRegEx, {
        message: `Password must contain Minimum 8 and maximum 20 characters, 
        at least one uppercase letter, 
        one lowercase letter, 
        one number and 
        one special character`,
      })
      password: string;
    
      @IsNotEmpty()
      @IsEmail(null, { message: 'Please provide valid Email.' })
      email: string;
}
