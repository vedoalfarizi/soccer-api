const TeamRepository = require('../TeamRepository');

describe('TeamRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    const teamRepository = new TeamRepository();

    await expect(teamRepository.addTeam({})).rejects.toThrowError('TEAM_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(teamRepository.verifyTeam('')).rejects.toThrowError('TEAM_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(teamRepository.findTeam('')).rejects.toThrowError('TEAM_REPOSITORY.METHOD_NOT_IMPLEMENTED');

    await expect(teamRepository.verifyPlayerInTeam('', '')).rejects.toThrowError('TEAM_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(teamRepository.findPlayerInTeam('', '')).rejects.toThrowError('TEAM_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(teamRepository.addPlayerToTeam({})).rejects.toThrowError('TEAM_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
