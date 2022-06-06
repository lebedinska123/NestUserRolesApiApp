import { Model, Table, Column, DataType, BelongsToMany } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { UserModel } from "src/users/users.model";
import { UserRolesModel } from './user-roles.model';

interface RoleCreationAttrs {
    role: string;
    description: string;
}

@Table({tableName: 'roles'})
export class RolesModel extends Model<RolesModel, RoleCreationAttrs> {

    @ApiProperty({description: 'Id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true, allowNull: false})
    id: number;

    @ApiProperty({description: 'Название роли'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    role: string;

    @ApiProperty({example: 'Администратор', description: 'Описание роли'})
    @Column({type: DataType.STRING})
    description: string;

    @BelongsToMany(() => UserModel, () => UserRolesModel)
    users: UserModel[];
}