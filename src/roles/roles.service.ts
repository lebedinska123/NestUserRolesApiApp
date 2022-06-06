import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { RolesModel } from "./roles.model";
import { CreateRoleDto } from "./dto/create-role.dto";

@Injectable()
export class RolesService {
    constructor(@InjectModel(RolesModel) private roleRepository: typeof RolesModel) {}

    async createRole(roleModel: CreateRoleDto) {
        const role = await this.roleRepository.create(roleModel);

        return role;
    }

    async getRoleByName(role: string) {
        const _role = await this.roleRepository.findOne({where: {role}});

        return _role;
    }
}