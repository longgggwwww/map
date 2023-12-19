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
import { CreateProvinceDto } from './dto/create-province.dto';
import { DeleteProvinceDto } from './dto/delete-province.dto';
import { FindProvinceDto } from './dto/find-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { ProvinceService } from './province.service';

@Controller('provinces')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Post()
  create(@Body() createProvinceDto: CreateProvinceDto) {
    return this.provinceService.create(createProvinceDto);
  }

  @Get()
  findAll(@Query() findProvinceDto: FindProvinceDto) {
    return this.provinceService.findAll(findProvinceDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.provinceService.findUniq({ id: +id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProvinceDto: UpdateProvinceDto,
  ) {
    return this.provinceService.update({
      where: { id: +id },
      data: updateProvinceDto,
    });
  }

  @Delete('batch')
  removeMany(@Body() deleteProvinceDto: DeleteProvinceDto) {
    return this.provinceService.removeMany({
      id: {
        in: deleteProvinceDto.ids,
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.provinceService.remove({ id: +id });
  }
}
