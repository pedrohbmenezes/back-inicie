import { PostService } from './../post/post.service';
import { log } from 'console';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import { Request } from 'express';

@Injectable()
export class UsersService {
    constructor(private http: HttpService, private postService: PostService) { }
    options:AxiosRequestConfig = {
        headers:{
            "Authorization": "Bearer 75592a10e42e7598873c2fa33e52d21e802b9c433f42aeb09a76213f4a109569",
            'Content-Type': 'application/json'}
    }
    baseUrl = "https://gorest.co.in/public/v2/"
    findAll():Promise<AxiosResponse>{
        return this.http.get("https://gorest.co.in/public/v2/users").toPromise()
    }
    findOne(id: number): Promise<AxiosResponse>{
        return this.http.get(this.baseUrl + "/users?id=" + id).toPromise()
        
    }
    newUser(req: Request): Promise<AxiosResponse>{
        const data = {
            name: req.body.name,
            gender: req.body.gender,
            email: req.body.email,
            status:req.body.status
        }
        const newuser = this.http.post(this.baseUrl + "/users", data, this.options).toPromise()
        newuser.then(resUser => {
            this.postService.newPost(resUser.data.id, req.body.title, req.body.body).then(resPost => {
                log("New Post" + JSON.stringify(resPost.data))
                this.postService.newComment(resPost.data.id, req.body.comment, resUser.data.name, resUser.data.email).then(resComment =>log("New Comment" + JSON.stringify(resComment.data))).catch(log)
            }).catch(log)
        })
        return newuser
    }
}
