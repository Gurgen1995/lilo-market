// apps/backend/src/chat/chat.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async sendMessage(data: { senderId: string; receiverId: string; content: string }) {
    return this.prisma.chatMessage.create({
      data,
      include: {
        sender: true,
        receiver: true,
      },
    });
  }

  async getMessages(userId: string, otherUserId: string) {
    return this.prisma.chatMessage.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            receiverId: otherUserId,
          },
          {
            senderId: otherUserId,
            receiverId: userId,
          },
        ],
      },
      include: {
        sender: true,
        receiver: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async markAsRead(userId: string, otherUserId: string) {
    return this.prisma.chatMessage.updateMany({
      where: {
        senderId: otherUserId,
        receiverId: userId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });
  }
}