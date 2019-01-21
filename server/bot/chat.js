import fetch from 'isomorphic-unfetch';
import { Random } from '../helper';
import Activities from './activities';
import {
  SendMessageUrl
} from './url';

export default class Chat {
  constructor(body) {
    const {
      message: { from, chat }
    } = body;
    this.userId = from.id;
    this.fullName = `${from.first_name} ${from.last_name}`;
    this.userName = from.username;
    this.chatId = chat.id;
    this.chatLog = [];
    this.lastSeen = new Date();
    this.greetings();
  }
  get avaliableActivites() {
    const { chatLog } = this;
    if (chatLog.length === Activities.length) {
      this.chatLog = [];
      return Activities
    }
    const avaliableActivities = Activities.filter(activity => (
      chatLog.indexOf(activity.id) < 0
    ));
    return avaliableActivities;
  }
  get activity() {
    const avaliableActivites = this.avaliableActivites;
    return Random(avaliableActivites);
  }
  generateMessage(activity) {
    return `
    Random Thought:

    _${activity.text}_
    ${activity.link ? `[Visit](${activity.link}) ` : ''}
    `;
  }
  async greetings() {
    const message = `
    _Hello Stranger_ 
    
    *So you think you bored!*
    
    _When you are bored type anything you want i will give you something to do._
    `;
    this.sendMessage(message)
  }
  async sendMessage(message) {
    const body = { chat_id: this.chatId, parse_mode: 'Markdown', text: message };
    return await fetch(`${SendMessageUrl(process.env.TOKEN)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  }
  async talk() {
    const { activity } = this;
    const message = this.generateMessage(activity)
    const response = this.sendMessage(message);
    if (response.ok) {
      this.lastSeen = new Date();
      this.chatLog = [...this.chatLog, activity.id]
    }
  }
}