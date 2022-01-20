const teams = require('../../database/array/teams');

const AddTeam = require('../../../Domains/teams/entities/AddTeam');
const AddPlayer = require('../../../Domains/players/entities/AddPlayer');
const DetailedTeam = require('../../../Domains/teams/entities/DetailedTeam');
const DetailPlayer = require('../../../Domains/players/entities/DetailPlayer');

const TeamsArrayTestHelper = require('../../../../tests/TeamsArrayTestHelper');
const TeamRepositoryArray = require('../TeamRepositoryArray');

const InvariantError = require('../../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');

describe('TeamRepositoryArray', () => {
  afterEach(async () => {
    await TeamsArrayTestHelper.cleanArray();
  });

  describe('addTeam function', () => {
    it('should persist add team and return add team correctly', async () => {
      const addTeam = new AddTeam({
        name: 'a name',
        manager: 'a manager',
        stadion: 'a stadion',
      });

      const expectedResponse = {
        name: addTeam.name,
        manager: addTeam.manager,
        stadion: addTeam.stadion,
        players: addTeam.players,
      };

      const teamRepository = new TeamRepositoryArray(teams);
      const addedTeam = await teamRepository.addTeam(addTeam);

      const team = await TeamsArrayTestHelper.findTeamByName(addTeam.name);
      expect(team).toStrictEqual(expectedResponse);
      expect(addedTeam).toStrictEqual(expectedResponse);
    });
  });

  describe('verifyTeam function', () => {
    const name = 'newTeam';

    it('should not throw Error when team name was not exist', async () => {
      const teamRepository = new TeamRepositoryArray(teams);
      await expect(teamRepository.verifyTeam(name)).resolves.not.toThrow(InvariantError);
    });

    it('should throw Error when team name was exist', async () => {
      await TeamsArrayTestHelper.addTeam({ name });

      const teamRepository = new TeamRepositoryArray(teams);
      await expect(teamRepository.verifyTeam(name)).rejects.toThrow(InvariantError);
    });
  });

  describe('verifyPlayerInTeam funtion', () => {
    const playerName = 'new player';
    const teamName = 'Manchester United F.C.';

    it('should throw Error when player name was exist in the team', async () => {
      await TeamsArrayTestHelper.addTeam({ name: teamName });

      const teamRepository = new TeamRepositoryArray(teams);
      await expect(teamRepository.verifyPlayerInTeam(playerName, teamName))
        .resolves.not.toThrow(InvariantError);
    });

    it('should not throw Error when player name was not exist in the team', async () => {
      await TeamsArrayTestHelper.addTeam({ name: teamName });
      await TeamsArrayTestHelper.addPlayerToTeam({ name: playerName });

      const teamRepository = new TeamRepositoryArray(teams);
      await expect(teamRepository.verifyPlayerInTeam(playerName, teamName))
        .rejects.toThrow(InvariantError);
    });
  });

  describe('addPlayerToTeam function', () => {
    it('should persist add player to the team and return added player correctly', async () => {
      const addPlayer = new AddPlayer({
        name: 'a player name',
        nationality: 'a nationality',
        position: 'a position',
        team: 'a team name',
      });

      const expectedResponse = new DetailPlayer(addPlayer);

      await TeamsArrayTestHelper.addTeam({ name: addPlayer.team });

      const teamRepository = new TeamRepositoryArray(teams);
      const addedPlayer = await teamRepository.addPlayerToTeam(addPlayer);

      const player = await TeamsArrayTestHelper.findPlayerInTeam(addPlayer.name, addPlayer.team);
      expect(player).toStrictEqual({
        name: addPlayer.name,
        nationality: addPlayer.nationality,
        position: addPlayer.position,
      });
      expect(addedPlayer).toStrictEqual(expectedResponse);
    });
  });

  describe('findTeam function', () => {
    const name = 'teamName';

    it('should throw Error when team not exist', async () => {
      const teamRepository = new TeamRepositoryArray(teams);
      await expect(teamRepository.findTeam(name)).rejects.toThrow(NotFoundError);
    });

    it('should return detail team with the players correctly', async () => {
      const teamRepository = new TeamRepositoryArray(teams);

      await TeamsArrayTestHelper.addTeam({ name });
      await TeamsArrayTestHelper.addPlayerToTeam({}, name);

      const team = await teamRepository.findTeam(name);

      expect(team.players).toHaveLength(1);
      expect(team).toStrictEqual(new DetailedTeam({
        name,
        manager: 'Ralf Rangnick',
        stadion: 'Old Trafford',
        players: [{
          name: 'David de Gea',
          nationality: 'Spanyol',
          position: 'GK',
        }],
      }));
    });
  });

  describe('findPlayerInTeam function', () => {
    const playerName = 'playerName';
    const teamName = 'teamName';

    it('should throw Error when player not exist in team', async () => {
      await TeamsArrayTestHelper.addTeam({ name: teamName });

      const teamRepository = new TeamRepositoryArray(teams);
      await expect(teamRepository.findPlayerInTeam(playerName, teamName))
        .rejects.toThrow(NotFoundError);
    });

    it('should return detail player correctly', async () => {
      const teamRepository = new TeamRepositoryArray(teams);

      await TeamsArrayTestHelper.addTeam({ name: teamName });
      await TeamsArrayTestHelper.addPlayerToTeam({ name: playerName }, teamName);

      const player = await teamRepository.findPlayerInTeam(playerName, teamName);

      expect(player).toStrictEqual(new DetailPlayer({
        name: playerName,
        nationality: 'Spanyol',
        position: 'GK',
      }));
    });
  });
});
