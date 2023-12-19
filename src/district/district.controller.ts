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
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { DeleteDistrictDto } from './dto/delete-district.dto';
import { FindDistrictDto } from './dto/find-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';

@Controller('districts')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Post()
  create(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtService.create(createDistrictDto);
  }

  @Get()
  findAll(@Query() findDistrictDto: FindDistrictDto) {
    return this.districtService.findAll(findDistrictDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.districtService.findUniq({ id: +id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDistrictDto: UpdateDistrictDto,
  ) {
    return this.districtService.update({
      where: { id: +id },
      data: updateDistrictDto,
    });
  }

  @Delete('batch')
  removeMany(@Body() deleteDistrictDto: DeleteDistrictDto) {
    return this.districtService.removeMany({
      id: {
        in: deleteDistrictDto.ids,
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.districtService.remove({ id: +id });
  }
}
