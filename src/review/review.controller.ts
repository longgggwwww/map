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
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PrismaService } from 'nestjs-prisma';
import { Public } from 'src/auth/decorators/public.decorator';
import { LoggingInterceptor } from 'src/logging/logging.interceptor';
import { CreateReviewDto } from './dto/create-review.dto';
import { DeleteReviewDto } from './dto/delete-review.dto';
import { FindReviewDto } from './dto/find-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewService } from './review.service';

@UseInterceptors(new LoggingInterceptor(new PrismaService()))
@Controller('reviews')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private prisma: PrismaService,
  ) {}

  @Post('upload/:id')
  @UseInterceptors(
    FilesInterceptor('photos', 10, {
      storage: diskStorage({
        destination: 'uploads/reviews',
        filename(_req, file, callback) {
          console.log('hello world');
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
    return this.reviewService.update({
      where: {
        id: +id,
      },
      data: {
        photos: files.map((file) => file.path),
      },
    });
  }

  @Post()
  async create(@Body() createReviewDto: CreateReviewDto, @Request() req) {
    return await this.reviewService.create({
      ...createReviewDto,
      user: {
        connect: {
          id: req.user?.userId,
        },
      },
    });
  }

  @Get('check/:placeId')
  check(@Request() req, @Param('placeId') placeId: number) {
    return this.reviewService.check(+placeId, req.user?.userId);
  }

  @Public()
  @Get()
  findAll(@Query() findReviewDto: FindReviewDto) {
    return this.reviewService.findAll(findReviewDto);
  }

  @Get('me')
  findByMe(@Request() req) {
    return this.reviewService.findAll({
      where: {
        userId: +req.user?.userId,
      },
    });
  }

  @Public()
  @Get('place/:id')
  findByPlace(@Param('id', ParseIntPipe) id: number) {
    return this.reviewService.findByPlace(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findUniq({ id: +id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update({
      where: { id: +id },
      data: updateReviewDto,
    });
  }

  @Delete('batch')
  removeMany(@Body() deleteReviewDto: DeleteReviewDto) {
    return this.reviewService.removeMany({
      id: {
        in: deleteReviewDto.ids,
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove({ id: +id });
  }
}
