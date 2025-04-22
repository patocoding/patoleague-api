import { User } from "src/modules/user/entities/user.entity";

export class SignInResultDto {
    access_token: string;
    user: User;
}