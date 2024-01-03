import { Controller, UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from 'src/logging.interceptor';
import { RoleService } from './role.service';

@UseInterceptors(LoggingInterceptor)
@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    // @Post()
    // create(@Body() createRoleDto: CreateRoleDto) {
    //     return this.roleService.create(createRoleDto);
    // }

    // @Get()
    // findAll(@Query() findRoleDto: FindRoleDto) {
    //     return this.roleService.findAll(findRoleDto);
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.roleService.findUniq({ id: +id });
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    //     return this.roleService.update({
    //         where: { id: +id },
    //         data: updateRoleDto,
    //     });
    // }

    // @Delete('batch')
    // removeMany(@Body() deleteRoleDto: DeleteRoleDto) {
    //     return this.roleService.removeMany({
    //         id: {
    //             in: deleteRoleDto.ids,
    //         },
    //     });
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.roleService.remove({ id: +id });
    // }
}
