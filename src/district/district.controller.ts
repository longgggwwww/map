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
import { Public } from 'src/auth/decorators/public.decorator';
import { LoggingInterceptor } from 'src/logging/logging.interceptor';
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { DeleteDistrictDto } from './dto/delete-district.dto';
import { FindDistrictDto } from './dto/find-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';

@UseInterceptors(new LoggingInterceptor(new PrismaService()))
@Controller('districts')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Post()
  create(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtService.create(createDistrictDto);
  }

  @Public()
  @Get()
  findAll(@Query() findDistrictDto: FindDistrictDto) {
    return this.districtService.findAll(findDistrictDto);
  }

  @Public()
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
