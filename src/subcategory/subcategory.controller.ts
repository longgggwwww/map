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
import { Public } from 'src/auth/decorators/public.decorator';
import { LoggingInterceptor } from 'src/logging/logging.interceptor';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { DeleteSubCategoryDto } from './dto/delete-category.dto';
import { FindSubCategoryDto } from './dto/find-category.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { SubcategoryService } from './subcategory.service';

UseInterceptors(LoggingInterceptor);
@Controller('subcategories')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Post()
  create(@Body() createSubCategoryDto: CreateSubcategoryDto) {
    return this.subcategoryService.create(createSubCategoryDto);
  }

  @Public()
  @Get()
  findAll(@Query() findSubCategoryDto: FindSubCategoryDto) {
    return this.subcategoryService.findAll(findSubCategoryDto);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subcategoryService.findUniq({ id: +id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubCategoryDto: UpdateSubcategoryDto,
  ) {
    return this.subcategoryService.update({
      where: { id: +id },
      data: updateSubCategoryDto,
    });
  }

  @Delete('batch')
  removeMany(@Body() deleteSubCategoryDto: DeleteSubCategoryDto) {
    return this.subcategoryService.removeMany({
      id: {
        in: deleteSubCategoryDto.ids,
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subcategoryService.remove({ id: +id });
  }
}
