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
import { CreateGroupDto } from './dto/create-group.dto'
import { DeleteGroupDto } from './dto/delete-group.dto'
import { FindGroupDto } from './dto/find-group.dto'
import { UpdateGroupDto } from './dto/update-group.dto'
import { GroupService } from './group.service'

@UseInterceptors(new LoggingInterceptor(new PrismaService()))
@Controller('groups')
export class GroupController {
    constructor(private readonly groupService: GroupService) {}

    @Post()
    create(@Body() createGroupDto: CreateGroupDto) {
        return this.groupService.create(createGroupDto)
    }

    @Get()
    findAll(@Query() findGroupDto: FindGroupDto) {
        return this.groupService.findAll(findGroupDto)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.groupService.findUniq({ id: +id })
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
        return this.groupService.update({
            where: { id: +id },
            data: updateGroupDto,
        })
    }

    @Delete('batch')
    removeMany(@Body() deleteGroupDto: DeleteGroupDto) {
        return this.groupService.removeMany({
            id: {
                in: deleteGroupDto.ids,
            },
        })
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.groupService.remove({ id: +id })
    }
}
