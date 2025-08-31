// apps/backend/src/chat/chat.controller.ts
import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get(':userId')
  async getMessages(
    @Param('userId') userId: string,
    @Query('otherUserId') otherUserId: string,
  ) {
    return this.chatService.getMessages(userId, otherUserId);
  }

  @Post('send')
  async sendMessage(@Body() sendMessageDto: { senderId: string; receiverId: string; content: string }) {
    return this.chatService.sendMessage(sendMessageDto);
  }

  @Post('read')
  async markAsRead(@Body() markAsReadDto: { userId: string; otherUserId: string }) {
    return this.chatService.markAsRead(markAsReadDto.userId, markAsReadDto.otherUserId);
  }
}