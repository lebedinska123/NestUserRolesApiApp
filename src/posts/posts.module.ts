import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { PostModel } from "./posts.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModel } from "src/users/users.model";
import { FilesModule } from "src/files/files.module";

@Module({
    controllers: [PostsController],
    providers: [PostsService],
    imports: [
        SequelizeModule.forFeature([PostModel, UserModel]),
        FilesModule,
    ],
    exports: [PostsService],
})
export class PostsModule {}