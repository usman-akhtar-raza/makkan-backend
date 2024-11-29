// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3001);
//   app.enableCors({
//     origin: 'http://localhost:3000', // Allow requests from this origin
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
//     credentials: true, // Allow cookies if needed
//   });
// }
// bootstrap();


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS before starting the server
  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    credentials: true, // Allow cookies if needed
  });

  await app.listen(process.env.PORT ?? 3006); // Start the application
}
bootstrap();
