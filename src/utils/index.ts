import { Request } from 'express';
import { User } from 'src/modules/user/entities/user.entity';
export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  const regex = new RegExp('^2376[5-9]{1}\\d{7}$');
  return regex.test(phoneNumber);
};

export interface CustomRequest extends Request {
  user: User;
}
