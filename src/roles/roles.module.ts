import { Module } from "@nestjs/common";
import { RolesController } from "./roles.controller";
import { RolesService } from "./roles.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { RolesModel } from "./roles.model";
import { UserModel } from "src/users/users.model";
import { UserRolesModel } from "./user-roles.model";

@Module({
    controllers: [RolesController],
    providers: [RolesService],
    imports: [
        SequelizeModule.forFeature([RolesModel, UserModel, UserRolesModel])
    ],
    exports: [
        RolesService,
    ]
})
export class RolesModule {}