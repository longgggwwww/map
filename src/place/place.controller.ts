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
  Request,
  UploadedFiles,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PrismaService } from 'nestjs-prisma';
import { Public } from 'src/auth/decorators/public.decorator';
import { LoggingInterceptor } from 'src/logging/logging.interceptor';
import { Permissions } from 'src/permission/decoratos/permission.decorator';
import { Permission } from 'src/permission/enums/permission.enum';
import { Roles } from 'src/role/decoratos/role.decorator';
import { Role } from 'src/role/enums/role.enum';
import { CreatePlaceDto } from './dto/create-place.dto';
import { DeletePlaceDto } from './dto/delete-place.dto';
import { FindPlaceDto, FindWithinRadius } from './dto/find-place.dto';
import { ReviewPlaceDto, ReviewPlaceTmpDto } from './dto/review-place.dto';
import { UpdatePlaceDto, UpdatePlaceTmpDto } from './dto/update-place.dto';
import { PlaceService } from './place.service';

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
          const [head, ext] = file.originalname.split('.');
          const _file = `${head}-${Date.now()}.${ext}`;
          callback(null, Buffer.from(_file, 'latin1').toString('utf8'));
        },
      }),
    }),
  )
  upload(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles()
    files: Express.Multer.File[],
  ) {
    return this.placeService.update({
      where: {
        id: +id,
      },
      data: {
        photos: files.map((file) => file.path),
      },
    });
  }

  @Post('upload-tmp/:id')
  @UseInterceptors(
    FilesInterceptor('photos', 10, {
      storage: diskStorage({
        destination: 'uploads/place/tmp',
        filename(_req, file, callback) {
          const [head, ext] = file.originalname.split('.');
          const _file = `${head}-${Date.now()}.${ext}`;
          callback(null, Buffer.from(_file, 'latin1').toString('utf8'));
        },
      }),
    }),
  )
  uploadTmp(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles()
    files: Express.Multer.File[],
  ) {
    return this.placeService.updateTmpPhotos(
      id,
      files.map((file) => file.path),
    );
  }

  // Lấy danh sách địa điểm cập nhật (dành cho admin)
  @Permissions(Permission.BrowsePlace)
  @Get('place-tmp')
  findPlaceTmpList() {
    return this.placeService.getPlaceTmpList();
  }

  @Get('place-tmp/me/list')
  findMyPlaceTmpList(@Request() req) {
    return this.placeService.findMyPlaceTmp(req.user?.userId);
  }

  @Get('place-tmp/:id')
  findTmp(@Param('id', ParseIntPipe) id: number) {
    return this.placeService.getTmp(id);
  }

  @Patch('review/place-tmp')
  reviewUpdateTmp(@Body() dto: ReviewPlaceTmpDto) {
    return this.placeService.reviewPlaceTmp(dto.placeTmpIds, dto.status);
  }

  @Patch('place-tmp/:id')
  updatePlaceTmp(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePlaceTmpDto,
  ) {
    return this.placeService.updatePlaceTmp(id, dto);
  }

  @Post('place-tmp/:id')
  addUpdateTmp(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePlaceTmpDto,
    @Request() req,
  ) {
    return this.placeService.addPlaceTmp(id, {
      ...dto,
      createdById: req.user?.userId,
    });
  }

  @Post()
  async create(@Body() createPlaceDto: CreatePlaceDto, @Request() req) {
    return await this.placeService.create(createPlaceDto, req.user.userId);
  }

  @Version('2')
  @Public()
  @Get()
  findAllV2(@Query() findPlaceDto: FindPlaceDto) {
    if (findPlaceDto.categoryId) {
      findPlaceDto = {
        ...findPlaceDto,
        categoryId: +findPlaceDto.categoryId,
      };
    }
    const status: number = +findPlaceDto.status ?? -1;
    if (status > -1) {
      const { where, ...rest } = findPlaceDto;
      const dto = {
        ...rest,
        where: {
          status,
        },
      };
      return this.placeService.findAllV2(dto);
    } else {
      return this.placeService.findAllV2(findPlaceDto);
    }
  }

  @Version('3')
  @Public()
  @Get()
  findWithinRadius(@Query() dto: FindWithinRadius) {
    return this.placeService.findWithinRadius(dto);
  }

  @Public()
  @Get()
  findAll(@Query() findPlaceDto: FindPlaceDto) {
    const status: number = +findPlaceDto.status ?? -1;
    if (status > -1) {
      const { where, ...rest } = findPlaceDto;
      const dto = {
        ...rest,
        where: {
          status,
        },
      };
      return this.placeService.findAll(dto);
    } else {
      return this.placeService.findAll(findPlaceDto);
    }
  }

  @Public()
  @Get('search/:searchString')
  search(
    @Param('searchString') searchString: string,
    @Query() findPlaceDto: FindPlaceDto,
  ) {
    return this.placeService.search(searchString, findPlaceDto);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.placeService.findUniq({ id: +id });
  }

  @Permissions(Permission.BrowsePlace)
  @Roles(Role.Admin)
  @Patch('review')
  review(@Body() reviewPlaceDto: ReviewPlaceDto) {
    return this.placeService.review({
      where: {
        id: {
          in: reviewPlaceDto.placeIds,
        },
      },
      status: reviewPlaceDto.status,
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    return this.placeService.update({
      where: { id: +id },
      data: updatePlaceDto,
    });
  }

  @Delete('batch')
  removeMany(@Body() deletePlaceDto: DeletePlaceDto) {
    return this.placeService.removeMany({
      id: {
        in: deletePlaceDto.ids,
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.placeService.remove({ id: +id });
  }
}
