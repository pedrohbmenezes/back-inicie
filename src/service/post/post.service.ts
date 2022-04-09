import { Request } from 'express';
import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

@Injectable()
export class PostService {
    constructor(private http: HttpService) { }
    options:AxiosRequestConfig = {
        headers:{
            "Authorization": "Bearer 75592a10e42e7598873c2fa33e52d21e802b9c433f42aeb09a76213f4a109569",
            'Content-Type': 'application/json'}
    }
    baseUrl = "https://gorest.co.in/public/v2/"
    newPost(id: number, title: any, body: any): Promise<AxiosResponse> {
        const data = {
            title: title || "initial" ,
            body:body || "inital post"
        }
        return this.http.post(`${this.baseUrl}/users/${id}/posts`, data, this.options).toPromise()
    }
    newComment(idPost: number,comment:any, name:string, email:string): Promise<AxiosResponse>{
        const data = {
            body: comment || "Initial Comment",
            name: name,
            email:email
        }
        return this.http.post(`${this.baseUrl}/posts/${idPost}/comments`, data, this.options).toPromise()
    }
    deleteComment(idComment: number): Promise<AxiosResponse>{
        if (!idComment){throw new HttpException("id not found", HttpStatus.BAD_REQUEST)}
        return this.http.delete(`${this.baseUrl}/comments/${idComment}`, this.options).toPromise()
    }
    findPost(): Promise<AxiosResponse>{
        return this.http.get(this.baseUrl +"/posts", this.options).toPromise()
    }
    async postOnePublic(req: Request): Promise<any>{
        if(!req.body.name && !req.body.email){throw new HttpException("not found body", HttpStatus.BAD_REQUEST)}
        const posts = await this.findPost();
        const response = await this.newComment(posts.data[0].id, req.body.comment, req.body.name, req.body.email)
        return response.data
    }
}
