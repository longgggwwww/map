import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { LoggingInterceptor } from 'src/logging.interceptor';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { DeleteCategoryDto } from './dto/delete-category.dto';
import { FindCategoryDto } from './dto/find-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@UseInterceptors(LoggingInterceptor)
@Controller('categories')
export class CategoryController {
    constructor(private category: CategoryService) {}

    @Post()
    create(@Body() dto: CreateCategoryDto) {
        return this.category.create(dto);
    }

    @Public()
    @Get()
    findAll(@Query() dto: FindCategoryDto) {
        return this.category.findAll(dto);
    }

    @Public()
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.category.findUniq({ id });
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateCategoryDto,
    ) {
        return this.category.update({
            where: { id },
            data: dto,
        });
    }

    @Delete('batch')
    removeMany(@Body() dto: DeleteCategoryDto) {
        return this.category.remove({
            id: {
                in: dto.ids,
            },
        });
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.category.remove({ id });
    }
}
