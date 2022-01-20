const TeamsArrayTestHelper = require('../../../../tests/TeamsArrayTestHelper');
const container = require('../../container');
const createServer = require('../createServer');

describe('/teams endpoint', () => {
  afterEach(async () => {
    await TeamsArrayTestHelper.cleanArray();
  });

  describe('when POST /teams', () => {
    it('should response 201 and persisted team', async () => {
      const requestPayload = {
        name: 'Manchester United F.C.',
        manager: 'Ralf Rangnick',
        stadion: 'Old Trafford',
      };
      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/teams',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.team).toBeDefined();
    });

    it('should response 400 when request payload not contain needed property', async () => {
      const requestPayload = {
        name: 'Manchester United F.C.',
      };
      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/teams',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat team karena data tidak lengkap');
    });

    it('should response 400 when request payload not meet data type specification', async () => {
      const requestPayload = {
        name: true,
        manager: 'Ralf Rangnick',
        stadion: ['Old Trafford'],
      };
      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/teams',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat team karena tipe data tidak sesuai');
    });

    it('should response 400 when team name was exist', async () => {
      const requestPayload = {
        name: 'Manchester United F.C.',
        manager: 'Ralf Rangnick',
        stadion: 'Old Trafford',
      };

      await TeamsArrayTestHelper.addTeam({});
      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/teams',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('Tim dengan nama yang sama sudah ada');
    });
  });

  describe('when GET /teams', () => {
    it('should response 200 and persisted team', async () => {
      await TeamsArrayTestHelper.addTeam({});

      const server = await createServer(container);

      const response = await server.inject({
        method: 'GET',
        url: '/teams?name=Manchester United F.C.',
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.team).toBeDefined();
    });

    it('should response 400 when request payload not contain needed property', async () => {
      const server = await createServer(container);

      const response = await server.inject({
        method: 'GET',
        url: '/teams?key=value',
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak bisa mendapatkan data tim karena data tidak lengkap');
    });

    it('should response 404 when team not found', async () => {
      const server = await createServer(container);

      const response = await server.inject({
        method: 'GET',
        url: '/teams?name=Manchester United F.C.',
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('Data tim tidak ditemukan');
    });
  });
});
