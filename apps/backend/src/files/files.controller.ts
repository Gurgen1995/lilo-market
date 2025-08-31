// apps/backend/src/files/files.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('presigned-url')
  async generatePresignedUrl(@Body() body: { filename: string; contentType: string }) {
    return this.filesService.generatePresignedUrl(body.filename, body.contentType);
  }
}