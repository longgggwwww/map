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
import { CreatePositionDto } from './dto/create-position.dto'
import { DeletePositionDto } from './dto/delete-position.dto'
import { FindPositionDto } from './dto/find-position.dto'
import { UpdatePositionDto } from './dto/update-position.dto'
import { PositionService } from './position.service'

@UseInterceptors(new LoggingInterceptor(new PrismaService()))
@Controller('positions')
export class PositionController {
    constructor(private readonly positionService: PositionService) {}

    @Post()
    create(@Body() createPositionDto: CreatePositionDto) {
        return this.positionService.create(createPositionDto)
    }

    @Get()
    findAll(@Query() findPositionDto: FindPositionDto) {
        return this.positionService.findAll(findPositionDto)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.positionService.findUniq({ id: +id })
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updatePositionDto: UpdatePositionDto,
    ) {
        return this.positionService.update({
            where: { id: +id },
            data: updatePositionDto,
        })
    }

    @Delete('batch')
    removeMany(@Body() deletePositionDto: DeletePositionDto) {
        return this.positionService.removeMany({
            id: {
                in: deletePositionDto.ids,
            },
        })
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.positionService.remove({ id: +id })
    }
}
