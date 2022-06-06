import { Module, forwardRef } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UserModel } from './users.model';
import { RolesModel } from "src/roles/roles.model";
import { UserRolesModel } from "src/roles/user-roles.model";
import { RolesModule } from "src/roles/roles.module";
import { AuthModule } from "src/auth/auth.module";
import { PostModel } from "src/posts/posts.model";

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        SequelizeModule.forFeature([UserModel, RolesModel, UserRolesModel, PostModel]),
        RolesModule,
        forwardRef(() => AuthModule),
    ],
    exports: [
        UsersService,
    ]
})
export class UsersModule {

}