import { Controller, Get, UseGuards, Request, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
    this.userService = userService;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async list(): Promise<Array<UserEntity>> {
    return this.userService.listAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('medicine')
  async medicine_list(@Request() request) {
    return this.userService.medicine_list(request.body.limit)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('findMedicine')
  find_medicine(@Request() request) {
    return this.userService.find_medicine(request.body.id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post("add")
  add_medicine(@Request() request) {
    return this.userService.add_medicine(request.body.name, request.body.count)
  }
}
