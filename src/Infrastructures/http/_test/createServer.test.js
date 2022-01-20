const createServer = require('../createServer');

describe('HTTP server', () => {
  it('should response 404 when request unregistered route', async () => {
    const server = await createServer({});

    const response = await server.inject({
      method: 'GET',
      url: '/unregisteredRoute',
    });

    expect(response.statusCode).toEqual(404);
  });

  it('should handle server error correctly', async () => {
    const requestPayload = {
      name: 'Manchester United F.C.',
      manager: 'Ralf Rangnick',
      stadion: 'Old Trafford',
    };
    const server = await createServer({});

    const response = await server.inject({
      method: 'POST',
      url: '/teams',
      payload: requestPayload,
    });

    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(500);
    expect(responseJson.status).toEqual('error');
    expect(responseJson.message).toEqual('terjadi kegagalan pada server kami');
  });
});
