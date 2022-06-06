import { Injectable, HttpException, HttpStatus, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcryptjs from "bcryptjs";
import { UserModel } from "src/users/users.model";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Injectable()
export class AuthService {
    constructor (private userService: UsersService,
        private jwtService: JwtService) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);

        return this.generateToken(user);
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);

        if (candidate) {
            throw new HttpException('Пользователь с таким email уже существует!', HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcryptjs.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashPassword});

        return this.generateToken(user);
    }

    @ApiOperation({summary: 'Генерация токена для зарегистрированного пользователя'})
    @ApiResponse({type: Object})
    private generateToken(user: UserModel) {
        const payload = {email: user.email, id: user.id, role: user.roles};

        return {
            token: this.jwtService.sign(payload),
        };
    }

    @ApiOperation({summary: 'Валидация пользователя при входе'})
    @ApiResponse({type: [UserModel]})
    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);

        if (user) {
            const passwordEquels = await bcryptjs.compare(userDto.password, user.password);

            if (passwordEquels) {
                return user;
            }
        }

        throw new UnauthorizedException({message: 'Некорректный email или пароль!'});
    }
}