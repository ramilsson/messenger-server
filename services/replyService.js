const getRepliesQuery = `
  SELECT
    reply.id 'id',
    reply.text 'text',
      json_object(
        'id', user.id,
        'name', user.name
      ) 'author',
    reply.roomId 'roomId',
    reply.createdAt 'createdAt'
  FROM reply
  INNER JOIN user ON user.id = reply.authorId
  INNER JOIN room ON room.chatId = ?
  WHERE reply.roomId = room.id
  ORDER BY reply.createdAt
`;

const createReplyQuery = `
  INSERT INTO reply (text, authorId, roomId)
  VALUES (?, ?, ?)
`;

const getReplyQuery = `
  SELECT
    reply.id 'id',
    text 'text',
    createdAt 'createdAt',
    json_object(
      'id', user.id,
      'name', user.name
    ) 'author',
    roomId 'roomId'
  FROM reply
  INNER JOIN user ON user.id = reply.authorId
  WHERE reply.id = ?
`;

class ReplyService {
  constructor(mysql) {
    this.mysql = mysql;
  }

  getReplies = async (chatId) => {
    try {
      const connection = await this.mysql.getConnection();
      const [replies] = await connection.query(getRepliesQuery, [chatId]);
      connection.release();
      return replies;
    } catch (error) {
      await Promise.reject({
        code: 500,
        payload: error,
      });
    }
  };

  createReply = async (reply) => {
    const { text, authorId, roomId } = reply;
    try {
      const connection = await this.mysql.getConnection();
      const [query] = await connection.query(createReplyQuery, [
        text,
        authorId,
        roomId,
      ]);
      const insertId = query.insertId;
      const [replies] = await connection.query(getReplyQuery, [insertId]);
      const insertedReply = replies[0];
      connection.release();
      return insertedReply;
    } catch (error) {
      await Promise.reject({
        code: 500,
        payload: error,
      });
    }
  };

  getReply = async (id) => {
    try {
      const connection = await this.mysql.getConnection();
      const [replies] = await connection.query(getReplyQuery, [id]);
      connection.release();
      return replies[0];
    } catch (error) {
      await Promise.reject({
        code: 500,
        payload: error,
      });
    }
  };
}

async function replyService(fastify) {
  fastify.decorate('replyService', new ReplyService(fastify.mysql));
}

module.exports = replyService;
