import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";
import { RolesGuard } from "./roles.guard";

@Module({
    imports: [ConfigModule, JwtModule],
    controllers: [RoleController],
    providers: [
        RoleService,
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class RoleModule {}
