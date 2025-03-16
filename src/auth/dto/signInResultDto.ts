import { User } from "src/user/entities/user.entity";

export class SignInResultDto {
    access_token: string;
    user: User;
}