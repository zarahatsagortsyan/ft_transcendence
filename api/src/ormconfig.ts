import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config } from "dotenv";

config();

const configg :TypeOrmModuleOptions=
{
    name:'default',
    type : 'postgres',
    host : process.env.POSTGRES_HOST,
    port : parseInt(process.env.POSTGRES_PORT),
    database : process.env.POSTGRES_DATABASE as string,
    username : process.env.POSTGRES_USE,
    password : process.env.POSTGRES_PASSWORD as string,
    autoLoadEntities: true,
    synchronize: true,
    // entities: ['src/**/*.entity.ts'],
    // ssl: false,
}

export default configg
