import { Injectable } from "@nestjs/common";
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";


@ValidatorConstraint()
@Injectable()
export class IsMinDateStringConstraint implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    const now = new Date().getTime();
    const due = new Date(value).getTime();

    return due > now;
  }

  defaultMessage?(): string {
    return `Date $value should be after ${new Date().toISOString()}`;
  }

}

export function IsMinDateString(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsMinDateStringConstraint,
    });
  }
}