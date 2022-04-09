import { AxiosResponse } from 'axios';
import { log } from 'console';

import { PostService } from './../service/post/post.service';
import { Controller, Delete, Request, HttpException, HttpStatus, Get, Post, Req } from '@nestjs/common';

@Controller('post')
export class PostController {
    constructor(private postService:PostService, ) { }
    
    @Delete("Comment") // Deletando comentário pelo id
    async deleteComment(@Request() req) {
        const res = await this.postService.deleteComment(req.body.id)
            .catch(e => {
            throw new HttpException(e, HttpStatus.FORBIDDEN)
            })
        if (res.data.length = 0) {
            res.data.status = "OK"
        }
        return res.data.status
    }
    @Get() //Requisitando todos os posts
    async findPost() { 
        const posts = await this.postService.findPost()
            .catch(e => {
               throw new HttpException(e, HttpStatus.FORBIDDEN) 
            })
        return posts.data
    }

    @Post("commentone") // Comentando no primeiro post da lista publica
    async commentPost(@Request() req) {
        return await this.postService.postOnePublic(req)
    }
}
