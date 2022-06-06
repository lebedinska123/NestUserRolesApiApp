import { Model, Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from "src/users/users.model";
import { RolesModel } from "./roles.model";

@Table({tableName: 'user_roles', createdAt: false, updatedAt: false})
export class UserRolesModel extends Model<UserRolesModel> {
    @ApiProperty({description: 'Id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true, allowNull: false})
    id: number;

    @ApiProperty({description: 'Id роли'})
    @ForeignKey(() => RolesModel)
    @Column({type: DataType.INTEGER})
    roleId: number;

    @ApiProperty({example: 'user', description: 'Id пользователя'})
    @ForeignKey(() => UserModel)
    @Column({type: DataType.INTEGER})
    userId: number;
}