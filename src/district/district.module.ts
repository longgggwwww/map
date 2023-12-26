import { Module } from '@nestjs/common';
import { DistrictController } from './district.controller';
import { DistrictService } from './district.service';

@Module({
  controllers: [DistrictController],
  providers: [DistrictService],
})
export class DistrictModule {}
