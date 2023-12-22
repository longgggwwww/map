import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { PlaceController } from './place.controller'
import { PlaceService } from './place.service'

@Module({
    imports: [MulterModule.register({ dest: 'uploads' })],
    controllers: [PlaceController],
    providers: [PlaceService],
})
export class PlaceModule {}
