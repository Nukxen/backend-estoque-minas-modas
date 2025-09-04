import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BeatifulyConsole } from '../lib/beatifuly-console';
import { AppModule } from './app.module';

const port = process.env.PORT || 3030;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    //Pipes
    app.useGlobalPipes(
    new ValidationPipe({
      transform: true,               // transforma plain object em DTO class
      whitelist: true,               // remove propriedades não decoradas no DTO
      forbidNonWhitelisted: true,    // erro se vier campo desconhecido
      transformOptions: {
        enableImplicitConversion: true, // tenta converter tipos (string -> number, etc.)
      },
    }),
  );

    const config = new DocumentBuilder()
      .setTitle('User API')
      .setDescription('Controle interno de usuarios na api')
      .setVersion('1.0.1')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(port);
    console.clear();
    BeatifulyConsole.message(`Api rodando: http://localhost:${port}/api`);
  } catch (e) {
    console.clear();
    BeatifulyConsole.message(e, true);
  }
}
bootstrap();
