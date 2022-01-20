const TeamUseCase = require('../../../../Applications/use_case/TeamUseCase');

class TeamsHandler {
  constructor(container) {
    this._container = container;

    this.postTeamHandler = this.postTeamHandler.bind(this);
    this.getTeamHandler = this.getTeamHandler.bind(this);
  }

  async postTeamHandler(request, h) {
    const teamUseCase = this._container.getInstance(TeamUseCase.name);
    const team = await teamUseCase.createTeamExec(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        team,
      },
    });
    response.code(201);
    return response;
  }

  async getTeamHandler(request, h) {
    const teamUseCase = this._container.getInstance(TeamUseCase.name);
    const team = await teamUseCase.getTeamExec(request.query);

    const response = h.response({
      status: 'success',
      data: {
        team,
      },
    });
    return response;
  }
}

module.exports = TeamsHandler;
