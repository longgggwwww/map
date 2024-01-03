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
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { DeleteCompanyDto } from './dto/delete-company.dto';
import { FindCompanyDto } from './dto/find-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@UseInterceptors(LoggingInterceptor)
@Controller('companies')
export class CompanyController {
    constructor(private company: CompanyService) {}

    @Post()
    create(@Body() dto: CreateCompanyDto) {
        return this.company.create(dto);
    }

    @Public()
    @Get()
    findAll(@Query() dto: FindCompanyDto) {
        return this.company.findAll(dto);
    }

    @Public()
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.company.findUniq({ id });
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateCompanyDto,
    ) {
        return this.company.update({
            where: { id },
            data: dto,
        });
    }

    @Delete('batch')
    removeMany(@Body() dto: DeleteCompanyDto) {
        return this.company.remove({
            id: {
                in: dto.ids,
            },
        });
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.company.remove({ id });
    }
}
