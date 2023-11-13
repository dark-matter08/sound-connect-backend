import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('uploads/:filename')
  streamFile(@Param('filename') filename: string, @Res() res: Response): void {
    const file = createReadStream(
      join(__dirname, '..', 'public', 'uploads', filename),
    );

    (file as any).pipe(res);
  }
}
