const AddTeam = require('../../../Domains/teams/entities/AddTeam');
const DetailedTeam = require('../../../Domains/teams/entities/DetailedTeam');

const TeamRepository = require('../../../Domains/teams/TeamRepository');
const TeamUseCase = require('../TeamUseCase');

describe('TeamUseCase', () => {
  describe('createTeamExec function', () => {
    it('should orchestrating the create team action correctly', async () => {
      const useCasePayload = {
        name: 'a name',
        manager: 'a manager',
        stadion: 'a stadion',
      };

      const expectedResponse = new AddTeam(useCasePayload);

      const mockTeamRepository = new TeamRepository();

      mockTeamRepository.verifyTeam = jest.fn(() => Promise.resolve());
      mockTeamRepository.addTeam = jest.fn(() => Promise.resolve(expectedResponse));

      const teamUseCase = new TeamUseCase({
        teamRepository: mockTeamRepository,
      });

      const addedTeam = await teamUseCase.createTeamExec(useCasePayload);
      expect(addedTeam).toStrictEqual(expectedResponse);
      expect(mockTeamRepository.verifyTeam).toBeCalledWith(expectedResponse.name);
      expect(mockTeamRepository.addTeam).toBeCalledWith(expectedResponse);
    });
  });

  describe('getTeamExec function', () => {
    it('should orchestrating the create team action correctly', async () => {
      const useCasePayload = {
        name: 'a name',
      };

      const expectedResponse = new DetailedTeam({
        name: useCasePayload.name,
        manager: 'a manager',
        stadion: 'a stadion',
        players: [],
      });

      const mockTeamRepository = new TeamRepository();

      mockTeamRepository.findTeam = jest.fn(() => Promise.resolve(expectedResponse));

      const teamUseCase = new TeamUseCase({
        teamRepository: mockTeamRepository,
      });

      const detailedTeam = await teamUseCase.getTeamExec(useCasePayload);
      expect(detailedTeam).toStrictEqual(expectedResponse);
      expect(mockTeamRepository.findTeam).toBeCalledWith(useCasePayload.name);
    });

    it('shoud return error cause not contrain needed property', async () => {
      const useCasePayload = {
        inValid: '',
      };

      const teamUseCase = new TeamUseCase({
        mockTeamRepository: {},
      });

      await expect(teamUseCase.getTeamExec(useCasePayload)).rejects.toThrowError('DETAIL_TEAM.NOT_CONTAIN_NEEDED_PROPERTY');
    });
  });
});
