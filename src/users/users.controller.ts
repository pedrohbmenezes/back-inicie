import { log } from 'console';
import { Controller, Get, HttpException, HttpStatus, Param, Post, Request } from '@nestjs/common';
import { UsersService } from 'src/service/users/users.service';

@Controller('users')
export class UsersController {
    
    constructor(private userService: UsersService) {
        
    }

    @Get()
    async getUsers() { // Requisitando todos os usuários. 
        const res = await  this.userService.findAll()
        return res.data 
    }
    @Get("/id")
    async getuserid(@Request() req) { //Requisitando usuários pelo id, id deve esta no body da requisição
        if (!req.body.id) {
             throw new HttpException('Id not found', HttpStatus.BAD_REQUEST);
        }
        const res = await this.userService.findOne(req.body.id)
        if (res.data.length == 0 || res.data.length > 1) {
            throw new HttpException('Id not found', HttpStatus.BAD_REQUEST);
        }
        return res.data
    }

    //Criando novo usuário, a mesma função irá criar também um post e um comentário para este post. todos os paramentos devem ser informados no body da requisição. parâmetros: name, gender, email, status, title, comment.
    @Post()
    async newuser(@Request()req) {
        const response = await this.userService.newUser(req).catch(err => {
            throw new HttpException("err", HttpStatus.BAD_REQUEST)
        })
        return response.data.id 
    }
}
