import { Model, Table, Column, DataType, BelongsToMany, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { RolesModel } from 'src/roles/roles.model';
import { UserRolesModel } from 'src/roles/user-roles.model';
import { PostModel } from 'src/posts/posts.model';

interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({
    tableName: 'user',
})
export class UserModel extends Model<UserModel, UserCreationAttrs> {
    @ApiProperty({example: '1', description: 'Id'})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({example: 'email@domain.com', description: 'Email пользователя'})
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @ApiProperty({description: 'Пароль пользователя'})
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    banned: boolean;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    banReason: string;

    @BelongsToMany(() => RolesModel, () => UserRolesModel)
    roles: RolesModel[];

    @HasMany(() => PostModel)
    posts: PostModel[];
}