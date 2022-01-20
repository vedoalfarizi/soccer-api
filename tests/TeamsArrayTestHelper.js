/* istanbul ignore file */

const teams = require('../src/Infrastructures/database/array/teams');

const TeamsArrayTestHelper = {
  async addTeam({
    name = 'Manchester United F.C.', manager = 'Ralf Rangnick', stadion = 'Old Trafford', players = [],
  }) {
    teams.push({
      name,
      manager,
      stadion,
      players,
    });
  },

  async findTeamByName(name) {
    return teams.find((team) => team.name === name);
  },

  async addPlayerToTeam({
    name = 'David de Gea', nationality = 'Spanyol', position = 'GK',
  }, team = 'Manchester United F.C.') {
    const idxTeam = teams.findIndex((currTeam) => currTeam.name === team);
    teams[idxTeam].players.push({ name, nationality, position });
  },

  async findPlayerInTeam(playerName, teamName) {
    const idxTeam = teams.findIndex((team) => team.name === teamName);

    return teams[idxTeam].players.find((player) => player.name === playerName);
  },

  async cleanArray() {
    teams.length = 0;
  },
};

module.exports = TeamsArrayTestHelper;
