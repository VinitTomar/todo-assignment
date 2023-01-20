import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Todo } from './todos/todo.model';
import { TodoModule } from './todos/todos.module';
import { IsMinDateStringConstraint } from './validator/is-min-date-string';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: process.env.DIALECT,
      host: process.env.HOST,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      sync: {
        alter: true,
        force: false
      },
      synchronize: true,
      autoLoadModels: true,
      ssl: true,
      models: [Todo],

    }),
    TodoModule
  ],
  controllers: [AppController],
  providers: [AppService, IsMinDateStringConstraint],
})
export class AppModule { }
