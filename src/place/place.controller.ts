import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Roles } from 'src/role/decoratos/role.decorator';
import { Role } from 'src/role/enums/role.enum';
import { CreatePlaceDto } from './dto/create-place.dto';
import { DeletePlaceDto } from './dto/delete-place.dto';
import { FindPlaceDto } from './dto/find-place.dto';
import { ReviewPlaceDto } from './dto/review-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { PlaceService } from './place.service';

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
