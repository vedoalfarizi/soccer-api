const AddTeam = require('../../Domains/teams/entities/AddTeam');

class TeamUseCase {
  constructor({ teamRepository }) {
    this._teamRepository = teamRepository;
  }

  async createTeamExec(useCasePayload) {
    const addTeam = new AddTeam(useCasePayload);

    await this._teamRepository.verifyTeam(addTeam.name);

    return this._teamRepository.addTeam(addTeam);
  }

  _verifyGetTeamPayload({ name }) {
    if (!name) {
      throw new Error('DETAIL_TEAM.NOT_CONTAIN_NEEDED_PROPERTY');
    }
  }

  async getTeamExec(useCasePayload) {
    this._verifyGetTeamPayload(useCasePayload);

    return this._teamRepository.findTeam(useCasePayload.name);
  }
}

module.exports = TeamUseCase;
