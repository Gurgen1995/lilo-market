// apps/backend/src/subscriptions/subscriptions.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.subscription.create({ data });
  }

  async findBySeller(sellerId: string) {
    return this.prisma.subscription.findUnique({
      where: { sellerId },
    });
  }

  async update(sellerId: string, data: any) {
    return this.prisma.subscription.upsert({
      where: { sellerId },
      update: data,
      create: { ...data, sellerId },
    });
  }
}