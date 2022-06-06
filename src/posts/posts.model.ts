import { Model, Table, Column, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import { UserModel } from "src/users/users.model";

interface PostCreationAttrs {
    title: string;
    content: string;
    userId: number;
    image: string;
}

@Table({tableName: 'post'})
export class PostModel extends Model<PostModel, PostCreationAttrs> {
    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @ForeignKey(() => UserModel)
    @Column({type: DataType.INTEGER})
    userId: number;

    @Column({type: DataType.STRING})
    image: string;
    
    @BelongsTo(() => UserModel)
    author: UserModel;
}