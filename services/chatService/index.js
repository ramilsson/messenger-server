const { GET_CHAT } = require('./queries');

class ChatService {
  constructor(mysql) {
    this.mysql = mysql;
  }

  getChat = async (id) => {
    try {
      const connection = await this.mysql.getConnection();
      const [chats] = await connection.execute(GET_CHAT, [id]);
      connection.release();
      return chats[0];
    } catch (error) {
      throw error;
    }
  };
}

async function chatService(fastify) {
  fastify.decorate('chatService', new ChatService(fastify.mysql));
}

module.exports = chatService;
