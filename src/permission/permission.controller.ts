import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { LoggingInterceptor } from 'src/logging/logging.interceptor';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { DeletePermissionDto } from './dto/delete-permission.dto';
import { FindPermissionDto } from './dto/find-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionService } from './permission.service';

@UseInterceptors(new LoggingInterceptor(new PrismaService()))
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @Get()
  findAll(@Query() findPermissionDto: FindPermissionDto) {
    return this.permissionService.findAll(findPermissionDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionService.findUniq({ id: +id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionService.update({
      where: { id: +id },
      data: updatePermissionDto,
    });
  }

  @Delete('batch')
  removeMany(@Body() deletePermissionDto: DeletePermissionDto) {
    return this.permissionService.removeMany({
      id: {
        in: deletePermissionDto.ids,
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionService.remove({ id: +id });
  }
}
