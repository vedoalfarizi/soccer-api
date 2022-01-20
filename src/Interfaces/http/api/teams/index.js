const TeamsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'teams',
  register: async (server, { container }) => {
    const teamsHandler = new TeamsHandler(container);
    server.route(routes(teamsHandler));
  },
};
