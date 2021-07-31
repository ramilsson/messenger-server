const { GET_REPLIES, CREATE_REPLY, GET_REPLY } = require('./queries');

class ReplyService {
  constructor(mysql) {
    this.mysql = mysql;
  }

  getReplies = async (chatId) => {
    try {
      const connection = await this.mysql.getConnection();
      const [replies] = await connection.execute(GET_REPLIES, [chatId]);
      connection.release();
      return replies;
    } catch (error) {
      throw error;
    }
  };

  createReply = async (reply) => {
    const { text, authorId, roomId } = reply;
    try {
      const connection = await this.mysql.getConnection();
      const [query] = await connection.execute(CREATE_REPLY, [
        text,
        authorId,
        roomId,
      ]);
      const insertId = query.insertId;
      const [replies] = await connection.execute(GET_REPLY, [insertId]);
      connection.release();
      return replies[0];
    } catch (error) {
      throw error;
    }
  };

  getReply = async (id) => {
    try {
      const connection = await this.mysql.getConnection();
      const [replies] = await connection.execute(GET_REPLY, [id]);
      connection.release();
      return replies[0];
    } catch (error) {
      throw error;
    }
  };
}

async function replyService(fastify) {
  fastify.decorate('replyService', new ReplyService(fastify.mysql));
}

module.exports = replyService;
