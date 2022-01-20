const AddPlayer = require('../../Domains/players/entities/AddPlayer');

class PlayerUseCase {
  constructor({ teamRepository }) {
    this._teamRepository = teamRepository;
  }

  async addPlayerToTeamExec(useCasePayload) {
    const addPlayer = new AddPlayer(useCasePayload);

    await this._teamRepository.findTeam(addPlayer.team);

    await this._teamRepository.verifyPlayerInTeam(addPlayer.name, addPlayer.team);

    return this._teamRepository.addPlayerToTeam(addPlayer);
  }

  _verifyGetTeamPayload({ name, team }) {
    if (!name || !team) {
      throw new Error('DETAIL_PLAYER.NOT_CONTAIN_NEEDED_PROPERTY');
    }
  }

  async getPlayerExec(useCasePayload) {
    this._verifyGetTeamPayload(useCasePayload);

    return this._teamRepository.findPlayerInTeam(useCasePayload.name, useCasePayload.team);
  }
}

module.exports = PlayerUseCase;
