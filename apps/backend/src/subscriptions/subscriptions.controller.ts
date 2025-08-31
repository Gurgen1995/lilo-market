// apps/backend/src/subscriptions/subscriptions.controller.ts
import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get('seller/:sellerId')
  async findBySeller(@Param('sellerId') sellerId: string) {
    return this.subscriptionsService.findBySeller(sellerId);
  }

  @Post()
  async create(@Body() createSubscriptionDto: any) {
    return this.subscriptionsService.create(createSubscriptionDto);
  }

  @Post(':sellerId')
  async update(@Param('sellerId') sellerId: string, @Body() updateSubscriptionDto: any) {
    return this.subscriptionsService.update(sellerId, updateSubscriptionDto);
  }
}