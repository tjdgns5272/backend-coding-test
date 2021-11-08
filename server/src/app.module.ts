import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoresModule } from './stores/stores.module';

@Module({
  imports: [StoresModule],
})
export class AppModule {}
