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
import { Public } from 'src/auth/decorators/public.decorator';
import { LoggingInterceptor } from 'src/logging/logging.interceptor';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { DeleteCategoryDto } from './dto/delete-category.dto';
import { FindCategoryDto } from './dto/find-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@UseInterceptors(new LoggingInterceptor(new PrismaService()))
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Public()
  @Get()
  findAll(@Query() findCategoryDto: FindCategoryDto) {
    return this.categoryService.findAll(findCategoryDto);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findUniq({ id: +id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update({
      where: { id: +id },
      data: updateCategoryDto,
    });
  }

  @Delete('batch')
  removeMany(@Body() deleteCategoryDto: DeleteCategoryDto) {
    return this.categoryService.removeMany({
      id: {
        in: deleteCategoryDto.ids,
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove({ id: +id });
  }
}
