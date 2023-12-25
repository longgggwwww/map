import {
    Body,
    Controller,
    Delete,
    FileTypeValidator,
    Get,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    Patch,
    Post,
    Query,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { PrismaService } from 'nestjs-prisma'
import { LoggingInterceptor } from 'src/logging/logging.interceptor'
import { Permissions } from 'src/permission/decoratos/permission.decorator'
import { Permission } from 'src/permission/enums/permission.enum'
import { Roles } from 'src/role/decoratos/role.decorator'
import { Role } from 'src/role/enums/role.enum'
import { CreatePlaceDto } from './dto/create-place.dto'
import { DeletePlaceDto } from './dto/delete-place.dto'
import { FindPlaceDto } from './dto/find-place.dto'
import { ReviewPlaceDto } from './dto/review-place.dto'
import { UpdatePlaceDto } from './dto/update-place.dto'
import { PlaceService } from './place.service'

@UseInterceptors(new LoggingInterceptor(new PrismaService()))
@Controller('places')
export class PlaceController {
    constructor(private readonly placeService: PlaceService) {}

    @Post('upload/:id')
    @UseInterceptors(
        FilesInterceptor('photos', 10, {
            storage: diskStorage({
                destination: 'uploads',
                filename(_req, file, callback) {
                    callback(
                        null,
                        Buffer.from(file.originalname, 'latin1').toString(
                            'utf8',
                        ),
                    )
                },
            }),
        }),
    )
    upload(
        @Param('id') id: string,
        @UploadedFiles(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 1000000 }),
                    new FileTypeValidator({
                        fileType: /(jpeg|jpg|png)$/i,
                    }),
                ],
            }),
        )
        files: Express.Multer.File[],
    ) {
        return this.placeService.update({
            where: {
                id: +id,
            },
            data: {
                photos: files.map((file) => file.path),
            },
        })
    }

    @Post()
    create(@Body() createPlaceDto: CreatePlaceDto) {
        return this.placeService.create(createPlaceDto)
    }

    @Get()
    findAll(@Query() findPlaceDto: FindPlaceDto) {
        return this.placeService.findAll(findPlaceDto)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.placeService.findUniq({ id: +id })
    }

    @Roles(Role.Admin)
    @Permissions(Permission.BrowsePost)
    @Patch('review/:id')
    review(@Param('id') id: string, @Body() reviewPlaceDto: ReviewPlaceDto) {
        return this.placeService.update({
            where: { id: +id },
            data: reviewPlaceDto,
        })
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
        return this.placeService.update({
            where: { id: +id },
            data: updatePlaceDto,
        })
    }

    @Delete('batch')
    removeMany(@Body() deletePlaceDto: DeletePlaceDto) {
        return this.placeService.removeMany({
            id: {
                in: deletePlaceDto.ids,
            },
        })
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.placeService.remove({ id: +id })
    }
}
