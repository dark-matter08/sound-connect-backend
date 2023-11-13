import { Request } from 'express';
import { User } from 'src/modules/user/entities/user.entity';
export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  const regex = new RegExp('^2376[5-9]{1}\\d{7}$');
  return regex.test(phoneNumber);
};

export interface CustomRequest extends Request {
  user: User;
}

export function dateToCronExpression(date: Date): string {
  const second = date.getSeconds();
  const minute = date.getMinutes();
  const hour = date.getHours();
  const dayOfMonth = date.getDate();
  const month = date.getMonth() + 1; // Months are 0-indexed in JavaScript
  const year = date.getFullYear();

  // Construct the cron expression
  const cronExpression = `${second} ${minute} ${hour} ${dayOfMonth} ${month} ${year}`;

  return cronExpression;
}
