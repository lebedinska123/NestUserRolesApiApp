import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserModel } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel(UserModel) private userRepository: typeof UserModel,
        private rolesService: RolesService) {}

    async createUser(userDto: CreateUserDto) {
        const isUserExist = await this.userRepository.findOne({where: {'email': userDto.email}});

        if (isUserExist) {
            throw new HttpException('Такой пользователь уже существует!', HttpStatus.BAD_REQUEST);
        }

        const user = await this.userRepository.create(userDto);
        const role = await this.rolesService.getRoleByName('user');

        await user.$set('roles', [role.id]);
        user.roles = [role];

        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}});

        return users;
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.findOne({where: {'email': email}, include: {all: true}});
    }

    async addRole(userRole: AddRoleDto) {
        const user = await this.userRepository.findByPk(userRole.userId);
        const role = await this.rolesService.getRoleByName(userRole.role);

        if (!user || !role) {
            throw new HttpException("Пользователь или роль не найдены!", HttpStatus.BAD_REQUEST);
        }

        await user.$add('role', role.id);
        
        return userRole;
    }

    async banUser(banUser: BanUserDto) {
        const user = await this.userRepository.findByPk(banUser.userId);

        if (!user) {
            throw new HttpException('Пользователь не найден!', HttpStatus.BAD_REQUEST);
        }

        user.banned = true;
        user.banReason = banUser.banReason;
        await user.save();

        return user;
    }

}