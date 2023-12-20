import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { CompanyModule } from './company/company.module';
import { DepartmentModule } from './department/department.module';
import { DistrictModule } from './district/district.module';
import { GroupModule } from './group/group.module';
import { PermissionModule } from './permission/permission.module';
import { PlaceModule } from './place/place.module';
import { PositionModule } from './position/position.module';
import { ProvinceModule } from './province/province.module';
import { ReviewModule } from './review/review.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { WardModule } from './ward/ward.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.forRoot({ isGlobal: true }),
    PermissionModule,
    RoleModule,
    ProvinceModule,
    DistrictModule,
    WardModule,
    CompanyModule,
    DepartmentModule,
    PositionModule,
    UserModule,
    AuthModule,
    CategoryModule,
    PlaceModule,
    ReviewModule,
    GroupModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
