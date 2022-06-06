import { Injectable } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { InjectModel } from "@nestjs/sequelize";
import { PostModel } from "./posts.model";
import { FilesService } from "src/files/files.service";

@Injectable()
export class PostsService {
    constructor(@InjectModel(PostModel) private postRepository: typeof PostModel,
        private filesService: FilesService) {}

    async createPost(postDto: CreatePostDto, image: any) {
        const imageFileName = await this.filesService.createFile(image);
        const post = await this.postRepository.create({...postDto, image: imageFileName});

        return post;
    }
}