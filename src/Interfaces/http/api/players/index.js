const PlayersHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'players',
  register: async (server, { container }) => {
    const playersHandler = new PlayersHandler(container);
    server.route(routes(playersHandler));
  },
};
