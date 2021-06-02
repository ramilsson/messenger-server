class SocketService {
  constructor() {
    this.clients = [];
  }

  addClient = ({ socketKey, socket, user, chatId }) => {
    this.clients.push({ socketKey, socket, user, chatId });
  };

  removeClient = (key) => {
    this.clients = this.clients.filter(
      (socketClient) => socketClient.key !== key
    );
  };
  y;

  getClients = (chatId) => {
    return this.clients.filter((client) => client.chatId === chatId);
  };
}

async function socketService(fastify) {
  fastify.decorate('socketService', new SocketService());
}

module.exports = socketService;
