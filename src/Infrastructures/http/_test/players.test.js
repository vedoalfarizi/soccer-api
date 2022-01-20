const TeamsArrayTestHelper = require('../../../../tests/TeamsArrayTestHelper');
const container = require('../../container');
const createServer = require('../createServer');

describe('/players endpoint', () => {
  afterEach(async () => {
    await TeamsArrayTestHelper.cleanArray();
  });

  describe('when POST /players', () => {
    it('should response 201 and persisted player', async () => {
      const requestPayload = {
        name: 'David de Gea',
        nationality: 'Spanyol',
        position: 'GK',
        team: 'Manchester United F.C.',
      };

      await TeamsArrayTestHelper.addTeam({ name: requestPayload.team });
      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/players',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.player).toBeDefined();
    });

    it('should response 400 when request payload not contain needed property', async () => {
      const requestPayload = {
        name: 'David de Gea',
        team: 'Manchester United F.C.',
      };

      await TeamsArrayTestHelper.addTeam({ name: requestPayload.team });
      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/players',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat menambahkan pemain ke tim karena data tidak lengkap');
    });

    it('should response 400 when request payload not meet data type specification', async () => {
      const requestPayload = {
        name: 9597,
        nationality: 'Spanyol',
        position: ['GK'],
        team: 'Manchester United F.C.',
      };

      await TeamsArrayTestHelper.addTeam({ name: requestPayload.team });
      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/players',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat menambahkan pemain ke tim karena tipe data tidak sesuai');
    });

    it('should response 404 when team not found', async () => {
      const requestPayload = {
        name: 'David de Gea',
        nationality: 'Spanyol',
        position: 'GK',
        team: 'Manchester United F.C.',
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/players',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('Data tim tidak ditemukan');
    });

    it('should response 400 when player was exist in the team', async () => {
      const requestPayload = {
        name: 'David de Gea',
        nationality: 'Spanyol',
        position: 'GK',
        team: 'Manchester United F.C.',
      };

      await TeamsArrayTestHelper.addTeam({ name: requestPayload.team });
      await TeamsArrayTestHelper.addPlayerToTeam({ name: requestPayload.name });
      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/players',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('Pemain dengan nama yang sama sudah ada di dalam tim');
    });
  });

  describe('when GET /players', () => {
    const requestPayload = {
      name: 'David de Gea',
      team: 'Manchester United F.C.',
    };

    it('should response 200 and persisted player', async () => {
      await TeamsArrayTestHelper.addTeam({});
      await TeamsArrayTestHelper.addPlayerToTeam({});

      const server = await createServer(container);

      const response = await server.inject({
        method: 'GET',
        url: `/players?team=${requestPayload.team}&name=${requestPayload.name}`,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.player).toBeDefined();
    });

    it('should response 400 when request payload not contain needed property', async () => {
      const server = await createServer(container);

      const response = await server.inject({
        method: 'GET',
        url: `/players?name=${requestPayload.name}`,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak bisa mendapatkan data pemain karena data tidak lengkap');
    });

    it('should response 404 when team not found', async () => {
      const server = await createServer(container);

      const response = await server.inject({
        method: 'GET',
        url: `/players?team=${requestPayload.team}&name=${requestPayload.name}`,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('Data tim tidak ditemukan');
    });

    it('should response 404 when player not found in team', async () => {
      await TeamsArrayTestHelper.addTeam({});

      const server = await createServer(container);

      const response = await server.inject({
        method: 'GET',
        url: `/players?team=${requestPayload.team}&name=${requestPayload.name}`,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('Data pemain tidak ditemukan');
    });
  });
});
