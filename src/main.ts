import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import * as csurf from 'csurf';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Security headers
  app.use(helmet());

  // ✅ Cookie parser
  app.use(cookieParser());

  // ✅ Rate limiter
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    }),
  );

  // ✅ Session setup
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'fallback-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      },
    }),
  );

  // ✅ CSRF protection
  app.use(csurf());

  // ✅ EJS templates
  app.setBaseViewsDir('src/views');
  app.setViewEngine('ejs');

  // ✅ Important for Render
  await app.listen(process.env.PORT || 3000);

  console.log(`🚀 Server running on port ${process.env.PORT || 3000}`);
}

bootstrap();
``