import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appService = app.get<AppService>(AppService);

  appService.defaultRules();
  appService.mcDonaldsRules();
  appService.dashboardRules();
}
bootstrap();
