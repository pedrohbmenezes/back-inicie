import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './service/users/users.service';
import { HttpModule } from '@nestjs/axios';
import { PostController } from './post/post.controller';
import { PostService } from './service/post/post.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, UsersController, PostController],
  providers: [AppService, UsersService, PostService],
})
export class AppModule {}
