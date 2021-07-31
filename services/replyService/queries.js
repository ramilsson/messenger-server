const CREATE_REPLY = `
  INSERT INTO reply (text, authorId, roomId)
  VALUES (?, ?, ?)
`;

const GET_REPLY = `
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

const GET_REPLIES = `
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

module.exports = {
  CREATE_REPLY,
  GET_REPLY,
  GET_REPLIES,
};
