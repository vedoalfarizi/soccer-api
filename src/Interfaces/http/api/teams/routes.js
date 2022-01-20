const routes = (handler) => ([
  {
    method: 'POST',
    path: '/teams',
    handler: handler.postTeamHandler,
  },
  {
    method: 'GET',
    path: '/teams',
    handler: handler.getTeamHandler,
  },
]);

module.exports = routes;
