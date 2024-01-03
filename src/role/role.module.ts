import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
    imports: [ConfigModule, JwtModule],
    controllers: [RoleController],
    providers: [RoleService],
})
export class RoleModule {}
