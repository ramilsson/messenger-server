const GET_CHAT = `
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

module.exports = { GET_CHAT };
