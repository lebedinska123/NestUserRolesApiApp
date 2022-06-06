import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RolesGuards implements CanActivate {
    constructor (private jwtService: JwtService, 
        private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();

        try {
            // Список ролей endpoint-а
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);

            if (!requiredRoles) {
                return true;
            }

            const authorization = req.headers.authorization;
            const bearer = authorization.split(' ')[0];
            const token = authorization.split(' ')[1];
            const user = this.jwtService.verify(token);

            console.log('user', user);

            return user.role.some(role => requiredRoles.includes(role.role));
        } catch (exeption) {
            console.log(`### Exeption : ${exeption}`);

            throw new HttpException('У пользователя нет доступа!', HttpStatus.FORBIDDEN);
        }

    }
}