const PlayerUseCase = require('../../../../Applications/use_case/PlayerUseCase');

class PlayersHandler {
  constructor(container) {
    this._container = container;

    this.postPlayerHandler = this.postPlayerHandler.bind(this);
    this.getPlayerHandler = this.getPlayerHandler.bind(this);
  }

  async postPlayerHandler(request, h) {
    const playerUseCase = this._container.getInstance(PlayerUseCase.name);
    const player = await playerUseCase.addPlayerToTeamExec(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        player,
      },
    });
    response.code(201);
    return response;
  }

  async getPlayerHandler(request, h) {
    const playerUseCase = this._container.getInstance(PlayerUseCase.name);
    const player = await playerUseCase.getPlayerExec(request.query);

    const response = h.response({
      status: 'success',
      data: {
        player,
      },
    });
    response.code(200);
    return response;
  }
}

module.exports = PlayersHandler;
