class PlayerRepository {
  async addTeam(addTeam) {
    throw new Error('TEAM_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyTeam(name) {
    throw new Error('TEAM_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async findTeam(name) {
    throw new Error('TEAM_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyPlayerInTeam(playerName, teamName) {
    throw new Error('TEAM_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async findPlayerInTeam(playerName, teamName) {
    throw new Error('TEAM_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async addPlayerToTeam(addPlayer) {
    throw new Error('TEAM_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = PlayerRepository;
