import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize'
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { UserModel } from './users/users.model';
import { RolesModel } from './roles/roles.model';
import { UserRolesModel } from './roles/user-roles.model';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { PostModel } from './posts/posts.model';
import { ServeStaticModule } from '@nestjs/serve-static';

import { resolve } from 'path';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [UserModel, RolesModel, UserRolesModel, PostModel],
            autoLoadModels: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: resolve(__dirname, 'static'),
        }),

        UsersModule,
        RolesModule,
        AuthModule,
        PostsModule,
    ]
})

export class AppModule {}