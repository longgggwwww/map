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
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { DeleteDepartmentDto } from './dto/delete-department.dto';
import { FindDepartmentDto } from './dto/find-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@UseInterceptors(new LoggingInterceptor(new PrismaService()))
@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  @Get()
  findAll(@Query() findDepartmentDto: FindDepartmentDto) {
    return this.departmentService.findAll(findDepartmentDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findUniq({ id: +id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentService.update({
      where: { id: +id },
      data: updateDepartmentDto,
    });
  }

  @Delete('batch')
  removeMany(@Body() deleteDepartmentDto: DeleteDepartmentDto) {
    return this.departmentService.removeMany({
      id: {
        in: deleteDepartmentDto.ids,
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentService.remove({ id: +id });
  }
}
