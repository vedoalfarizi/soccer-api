const AddPlayer = require('../../../Domains/players/entities/AddPlayer');
const DetailPlayer = require('../../../Domains/players/entities/DetailPlayer');

const TeamRepository = require('../../../Domains/teams/TeamRepository');
const PlayerUseCase = require('../PlayerUseCase');

describe('PlayerUseCase', () => {
  describe('addPlayerToTeamExec function', () => {
    it('should orchestrating the add player action correctly', async () => {
      const useCasePayload = {
        name: 'a name',
        nationality: 'a nationality',
        position: 'a position',
        team: 'a team name',
      };

      const expectedResponse = new AddPlayer(useCasePayload);

      const mockTeamRepository = new TeamRepository();

      mockTeamRepository.findTeam = jest.fn(() => Promise.resolve());
      mockTeamRepository.verifyPlayerInTeam = jest.fn(() => Promise.resolve());
      mockTeamRepository.addPlayerToTeam = jest.fn(() => Promise.resolve(expectedResponse));

      const playerUseCase = new PlayerUseCase({
        teamRepository: mockTeamRepository,
      });

      const addedPlayer = await playerUseCase.addPlayerToTeamExec(useCasePayload);
      expect(addedPlayer).toStrictEqual(expectedResponse);
      expect(mockTeamRepository.findTeam).toBeCalledWith(useCasePayload.team);
      expect(mockTeamRepository.verifyPlayerInTeam)
        .toBeCalledWith(useCasePayload.name, useCasePayload.team);
      expect(mockTeamRepository.addPlayerToTeam).toBeCalledWith(expectedResponse);
    });
  });

  describe('getPlayerExec function', () => {
    it('should orchestrating the add player action correctly', async () => {
      const useCasePayload = {
        team: 'teamname',
        name: 'playerName',
      };

      const expectedResponse = new DetailPlayer({
        name: useCasePayload.name,
        nationality: 'a nationality',
        position: 'a position',
      });

      const mockTeamRepository = new TeamRepository();

      mockTeamRepository.findPlayerInTeam = jest.fn(() => Promise.resolve(expectedResponse));

      const playerUseCase = new PlayerUseCase({
        teamRepository: mockTeamRepository,
      });

      const detailPlayer = await playerUseCase.getPlayerExec(useCasePayload);
      expect(detailPlayer).toStrictEqual(expectedResponse);
      expect(mockTeamRepository.findPlayerInTeam)
        .toBeCalledWith(useCasePayload.name, useCasePayload.team);
    });

    it('shoud return error cause not contrain needed property', async () => {
      const useCasePayload = {
        name: '',
      };

      const playerUsecase = new PlayerUseCase({
        mockTeamRepository: {},
      });

      await expect(playerUsecase.getPlayerExec(useCasePayload)).rejects.toThrowError('DETAIL_PLAYER.NOT_CONTAIN_NEEDED_PROPERTY');
    });
  });
});
