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
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { LoggingInterceptor } from 'src/logging/logging.interceptor';
import { Permissions } from 'src/permission/decoratos/permission.decorator';
import { Permission } from 'src/permission/enums/permission.enum';
import { Roles } from 'src/role/decoratos/role.decorator';
import { Role } from 'src/role/enums/role.enum';
import { CreatePlaceDto } from './dto/create-place.dto';
import { DeletePlaceDto } from './dto/delete-place.dto';
import { FindPlaceDto } from './dto/find-place.dto';
import { ReviewPlaceDto } from './dto/review-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { PlaceService } from './place.service';

@UseInterceptors(new LoggingInterceptor(new PrismaService()))
@Controller('places')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Post()
  create(@Body() createPlaceDto: CreatePlaceDto) {
    return this.placeService.create(createPlaceDto);
  }

  @Get()
  findAll(@Query() findPlaceDto: FindPlaceDto) {
    return this.placeService.findAll(findPlaceDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.placeService.findUniq({ id: +id });
  }

  @Roles(Role.Admin)
  @Permissions(Permission.BrowsePost)
  @Patch('review/:id')
  review(@Param('id') id: string, @Body() reviewPlaceDto: ReviewPlaceDto) {
    return this.placeService.update({
      where: { id: +id },
      data: reviewPlaceDto,
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
