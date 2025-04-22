import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { hash } from 'bcrypt';
@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}
  async create(createUserDto: CreateUserDto) : Promise<User> {
    const user : User = new User();

    user.fullName = createUserDto.fullName;
    user.email = createUserDto.email;
    user.password = createUserDto.password;

    const saltRounds = 10; 
    user.password = await hash(createUserDto.password, saltRounds);

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id })
  }

  findByEmail(email: string) {
    return this.userRepository.findOneBy({ email})
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user : User = new User();
    user.fullName = updateUserDto.fullName;
    user.email = updateUserDto.email;
    user.password = updateUserDto.password;
    user.id = id;
    return this.userRepository.save(user)
  }

  removeUser(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }
}
