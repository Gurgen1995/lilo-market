// apps/backend/src/admin/admin.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [totalUsers, totalSellers, totalProducts, totalOrders] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.seller.count(),
      this.prisma.product.count(),
      this.prisma.order.count(),
    ]);

    return {
      totalUsers,
      totalSellers,
      totalProducts,
      totalOrders,
    };
  }

  async moderateSeller(sellerId: string, action: 'approve' | 'reject' | 'suspend') {
    const updateData: any = {};
    
    switch (action) {
      case 'approve':
        updateData.isActive = true;
        break;
      case 'reject':
      case 'suspend':
        updateData.isActive = false;
        break;
    }

    return this.prisma.seller.update({
      where: { id: sellerId },
      data: updateData,
    });
  }

  async moderateProduct(productId: string, action: 'approve' | 'reject') {
    const updateData: any = {};
    
    switch (action) {
      case 'approve':
        updateData.isActive = true;
        break;
      case 'reject':
        updateData.isActive = false;
        break;
    }

    return this.prisma.product.update({
      where: { id: productId },
      data: updateData,
    });
  }
}