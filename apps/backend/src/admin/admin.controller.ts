// apps/backend/src/admin/admin.controller.ts
import { Controller, Get, Put, Param } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  async getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  @Put('sellers/:id/:action')
  async moderateSeller(
    @Param('id') sellerId: string,
    @Param('action') action: 'approve' | 'reject' | 'suspend',
  ) {
    return this.adminService.moderateSeller(sellerId, action);
  }

  @Put('products/:id/:action')
  async moderateProduct(
    @Param('id') productId: string,
    @Param('action') action: 'approve' | 'reject',
  ) {
    return this.adminService.moderateProduct(productId, action);
  }
}