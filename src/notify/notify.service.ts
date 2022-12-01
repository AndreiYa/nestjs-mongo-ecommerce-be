import { Injectable } from '@nestjs/common';
import {Telegraf} from "telegraf";
import {ITelegram} from "./interface/telegram.interface";
import {NotifyDTO} from "./dto/notify.dto";

@Injectable()
export class NotifyService {
  bot: Telegraf
  options: ITelegram

  constructor() {
    this.options = {
      token: '5977495083:AAGsa3XnTawx8uNhieoTRnBxXg-wbGNZTFE',
      chatId: '-1001819195635'
    }
    this.bot = new Telegraf(this.options.token)
  }

  async sendMessage(notifyDTO: NotifyDTO, chartId: string = this.options.chatId) {
    const message = `message type: ${notifyDTO.name}\n` +
                    `description: ${notifyDTO.description ?? ''}`
    await this.bot.telegram.sendMessage(chartId, message)
  }
}
