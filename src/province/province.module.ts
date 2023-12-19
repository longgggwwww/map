import { Module } from '@nestjs/common';
import { ProvinceController } from './province.controller';
import { ProvinceService } from './province.service';

@Module({
  controllers: [ProvinceController],
  providers: [ProvinceService],
})
export class ProvinceModule {}
