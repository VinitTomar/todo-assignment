import { Dialect } from "sequelize"

export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DIALECT: Dialect;
      [key: string]: string;
    }
  }
}

export type MockType<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]?: jest.Mock<{}>;
};