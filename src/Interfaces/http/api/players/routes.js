const routes = (handler) => ([
  {
    method: 'POST',
    path: '/players',
    handler: handler.postPlayerHandler,
  },
  {
    method: 'GET',
    path: '/players',
    handler: handler.getPlayerHandler,
  },
]);

module.exports = routes;
