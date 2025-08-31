// apps/backend/src/files/files.service.ts
import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesService {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      endpoint: `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}`,
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.MINIO_ACCESS_KEY,
        secretAccessKey: process.env.MINIO_SECRET_KEY,
      },
      forcePathStyle: true,
    });
  }

  async generatePresignedUrl(filename: string, contentType: string) {
    const key = `${uuidv4()}-${filename}`;
    
    const { url, fields } = await createPresignedPost(this.s3Client, {
      Bucket: process.env.MINIO_BUCKET,
      Key: key,
      Conditions: [
        ['content-length-range', 0, 10485760], // 10MB max
        ['starts-with', '$Content-Type', contentType.split('/')[0]],
      ],
      Fields: {
        'Content-Type': contentType,
      },
      Expires: 600, // 10 minutes
    });

    return {
      url,
      fields,
      key,
      publicUrl: `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET}/${key}`,
    };
  }

  async uploadFile(buffer: Buffer, filename: string, contentType: string) {
    const key = `${uuidv4()}-${filename}`;
    
    await this.s3Client.send(new PutObjectCommand({
      Bucket: process.env.MINIO_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    }));

    return `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET}/${key}`;
  }
}