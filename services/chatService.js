const getChatQuery = `
  SELECT
  chat.id 'id',
  chat.name 'name',
  chat.description 'description',
  json_arrayagg(
    json_object(
      'id', room.id, 
      'name', room.name,
      'description', room.description
    )
  ) 'rooms'
  FROM chat
  INNER JOIN room ON room.chatId = chat.id
  WHERE chat.id = ?
  GROUP BY chat.id
`;

class ChatService {
  constructor(mysql) {
    this.mysql = mysql;
  }

  getChat = async (id) => {
    try {
      const connection = await this.mysql.getConnection();
      const [chats] = await connection.execute(getChatQuery, [id]);
      connection.release();
      return chats[0];
    } catch (error) {
      await Promise.reject({
        code: 500,
        payload: error,
      });
    }
  };
}

async function chatService(fastify) {
  fastify.decorate('chatService', new ChatService(fastify.mysql));
}

module.exports = chatService;
