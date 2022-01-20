const InvariantError = require('../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const DetailPlayer = require('../../Domains/players/entities/DetailPlayer');
const DetailedTeam = require('../../Domains/teams/entities/DetailedTeam');
const TeamRepository = require('../../Domains/teams/TeamRepository');

class TeamRepositoryArray extends TeamRepository {
  constructor(teams) {
    super();
    this._teams = teams;
  }

  async addTeam(addTeam) {
    const {
      name,
      manager,
      stadion,
      players,
    } = addTeam;

    this._teams.push({
      name,
      manager,
      stadion,
      players,
    });

    return this._teams[this._teams.length - 1];
  }

  async verifyTeam(name) {
    if (this._teams.findIndex((team) => team.name === name) !== -1) {
      throw new InvariantError('Tim dengan nama yang sama sudah ada');
    }
  }

  async verifyPlayerInTeam(playerName, teamName) {
    const idxTeam = this._teams.findIndex((team) => team.name === teamName);

    if (this._teams[idxTeam].players.findIndex((player) => player.name === playerName) !== -1) {
      throw new InvariantError('Pemain dengan nama yang sama sudah ada di dalam tim');
    }
  }

  async addPlayerToTeam(addPlayer) {
    const {
      name,
      nationality,
      position,
      team,
    } = addPlayer;

    const idxTeam = this._teams.findIndex((currTeam) => currTeam.name === team);
    this._teams[idxTeam].players.push({ name, nationality, position });

    return new DetailPlayer(this._teams[idxTeam].players[this._teams[idxTeam].players.length - 1]);
  }

  async findTeam(name) {
    const team = this._teams.find((currTeam) => currTeam.name === name);
    if (!team) {
      throw new NotFoundError('Data tim tidak ditemukan');
    }

    return new DetailedTeam(team);
  }

  async findPlayerInTeam(playerName, teamName) {
    const team = await this.findTeam(teamName);

    const player = team.players.find((currPlayer) => currPlayer.name === playerName);
    if (!player) {
      throw new NotFoundError('Data pemain tidak ditemukan');
    }

    return new DetailPlayer(player);
  }
}

module.exports = TeamRepositoryArray;
