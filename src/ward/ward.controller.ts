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
} from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { LoggingInterceptor } from 'src/logging/logging.interceptor'
import { CreateWardDto } from './dto/create-ward.dto'
import { DeleteWardDto } from './dto/delete-ward.dto'
import { FindWardDto } from './dto/find-ward.dto'
import { UpdateWardDto } from './dto/update-ward.dto'
import { WardService } from './ward.service'

@UseInterceptors(new LoggingInterceptor(new PrismaService()))
@Controller('wards')
export class WardController {
    constructor(private readonly wardService: WardService) {}

    @Post()
    create(@Body() createWardDto: CreateWardDto) {
        return this.wardService.create(createWardDto)
    }

    @Get()
    findAll(@Query() findWardDto: FindWardDto) {
        return this.wardService.findAll(findWardDto)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.wardService.findUniq({ id: +id })
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateWardDto: UpdateWardDto) {
        return this.wardService.update({
            where: { id: +id },
            data: updateWardDto,
        })
    }

    @Delete('batch')
    removeMany(@Body() deleteWardDto: DeleteWardDto) {
        return this.wardService.removeMany({
            id: {
                in: deleteWardDto.ids,
            },
        })
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.wardService.remove({ id: +id })
    }
}
