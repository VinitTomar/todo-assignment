import { Dialect } from "sequelize"

export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DIALECT: Dialect;
      [key: string]: string;
    }
  }
}