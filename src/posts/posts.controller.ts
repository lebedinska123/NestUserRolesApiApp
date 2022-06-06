import { Controller, Post, Body, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostsService } from "./posts.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Post('/create')
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() post: CreatePostDto, @UploadedFile() image) {
        return this.postsService.createPost(post, image);
    }
}