import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [
    LocationsController
  ],
  providers: [LocationsService],
  imports: [PrismaModule, AuthModule],
})

export class LocationsModule { }
