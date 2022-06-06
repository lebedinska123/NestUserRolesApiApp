import { Controller, Get, Post, Body, UseGuards, UsePipes } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserModel } from "./users.model";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuards } from "src/auth/roles-auth.guards";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { ValidationPipe } from "src/pipes/validation.pipe";

@ApiTags('Пользователи')
@Controller('users')

export class UsersController {

    constructor(protected usersService: UsersService) {}

    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 200, type: UserModel})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({summary: 'Получение списка пользователей'})
    @ApiResponse({status: 200, type: [UserModel]})
    @Roles('admin')
    @UseGuards(RolesGuards)
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: 'Назначение роли пользователю'})
    @ApiResponse({status: 200})
    @Roles('admin')
    @UseGuards(RolesGuards)
    @Post('/add-role')
    addRole(@Body() role: AddRoleDto) {
        return this.usersService.addRole(role);
    }

    @ApiOperation({summary: 'Забанить пользователя'})
    @ApiResponse({status: 200})
    @Roles('admin')
    @UseGuards(RolesGuards)
    @Post('/ban-user')
    banUser(@Body() banUser: BanUserDto) {
        return this.usersService.banUser(banUser);

    }
}