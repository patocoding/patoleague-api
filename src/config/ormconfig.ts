import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config(); // Carrega variáveis de ambiente do .env

const isProduction = process.env.NODE_ENV === 'production';

export const typeOrmConfig: TypeOrmModuleOptions = isProduction
  ? {
      type: 'postgres',
      url: process.env.DATABASE_URL, // URL do banco remoto
      autoLoadEntities: true,
      synchronize: false, // Recomenda-se false em produção
      logging: false,
    }
  : {
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true, // Apenas para dev
      logging: true,
    };
