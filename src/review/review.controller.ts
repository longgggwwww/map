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
import { CreateReviewDto } from './dto/create-review.dto'
import { DeleteReviewDto } from './dto/delete-review.dto'
import { FindReviewDto } from './dto/find-review.dto'
import { UpdateReviewDto } from './dto/update-review.dto'
import { ReviewService } from './review.service'

@UseInterceptors(new LoggingInterceptor(new PrismaService()))
@Controller('reviews')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @Post()
    create(@Body() createReviewDto: CreateReviewDto) {
        return this.reviewService.create(createReviewDto)
    }

    @Get()
    findAll(@Query() findReviewDto: FindReviewDto) {
        return this.reviewService.findAll(findReviewDto)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.reviewService.findUniq({ id: +id })
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
        return this.reviewService.update({
            where: { id: +id },
            data: updateReviewDto,
        })
    }

    @Delete('batch')
    removeMany(@Body() deleteReviewDto: DeleteReviewDto) {
        return this.reviewService.removeMany({
            id: {
                in: deleteReviewDto.ids,
            },
        })
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.reviewService.remove({ id: +id })
    }
}
