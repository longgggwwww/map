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
import { CreateProvinceDto } from './dto/create-province.dto';
import { DeleteProvinceDto } from './dto/delete-province.dto';
import { FindProvinceDto } from './dto/find-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { ProvinceService } from './province.service';

@UseInterceptors(LoggingInterceptor)
@Controller('provinces')
export class ProvinceController {
    constructor(private province: ProvinceService) {}

    @Post()
    create(@Body() dto: CreateProvinceDto) {
        return this.province.create(dto);
    }

    @Public()
    @Get()
    findAll(@Query() dto: FindProvinceDto) {
        return this.province.findAll(dto);
    }

    @Public()
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        console.log(id, typeof id);
        return this.province.findUniq({ id });
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateProvinceDto,
    ) {
        return this.province.update({
            where: { id },
            data: dto,
        });
    }

    @Delete('batch')
    removeMany(@Body() deleteProvinceDto: DeleteProvinceDto) {
        return this.province.removeMany({
            id: {
                in: deleteProvinceDto.ids,
            },
        });
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.province.remove({ id });
    }
}
