import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env['PORT'] || 3000;

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Administrador de restaurantes')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('Restaurantes')
    .addTag('Empleados')
    .addTag('Menus')
    .addTag('Autenticación')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'authorization', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port).then(() => console.log(`API run in port ${port}`));
}
bootstrap();
