import { Controller, Post, Get, Body, Param } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";

@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @Post()
    create(@Body() roleModel: CreateRoleDto) {
        return this.rolesService.createRole(roleModel);
    }

    @Get('/:value')
    getByName(@Param('role') role: string) {
        return this.rolesService.getRoleByName(role);
    }
}