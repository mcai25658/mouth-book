/* eslint-disable class-methods-use-this */
import { axios } from '@/lib/axios';

class APiChat {
  constructor() {
    this.getChatRoomToken = this.getChatRoomToken.bind(this);
  }

  getChatRoomToken(transactionId: string): Promise<any> {
    return axios.post('/chatroom/transaction/token', {
      transactionId,
    });
  }
}
export default new APiChat();
