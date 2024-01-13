import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
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
  constructor(private readonly reviewService: ReviewService) {}

  @Post('upload/:id')
  @UseInterceptors(
    FilesInterceptor('photos', 10, {
      storage: diskStorage({
        destination: 'uploads/reviews',
        filename(_req, file, callback) {
          const [head, ext] = file.originalname.split('.');
          const _file = `${head}-${Date.now()}.${ext}`;
          callback(null, Buffer.from(_file, 'latin1').toString('utf8'));
        },
      }),
    }),
  )
  upload(
    @Param('id') id: string,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10000000 }),
          new FileTypeValidator({
            fileType: /(jpeg|jpg|png)$/i,
          }),
        ],
      }),
    )
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
  create(@Body() createReviewDto: CreateReviewDto, @Request() req) {
    return this.reviewService.create({
      ...createReviewDto,
      user: {
        connect: {
          id: req.user?.userId,
        },
      },
    });
  }

  @Public()
  @Get()
  findAll(@Query() findReviewDto: FindReviewDto) {
    return this.reviewService.findAll(findReviewDto);
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
