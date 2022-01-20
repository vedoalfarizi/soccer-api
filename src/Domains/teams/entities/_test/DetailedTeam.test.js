const DetailedTeam = require('../DetailedTeam');

describe('a DetailedTeam entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      name: 'a team',
      manager: 'a manager',
    };

    expect(() => new DetailedTeam(payload)).toThrowError('DETAILED_TEAM.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      name: 'a team',
      manager: 'a manager',
      stadion: 'a stadion',
      players: 'many player',
    };

    expect(() => new DetailedTeam(payload)).toThrowError('DETAILED_TEAM.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create detailedTeam object correctly', () => {
    const payload = {
      name: 'a team',
      manager: 'a manager',
      stadion: 'a stadion',
      players: [],
    };

    const {
      name,
      manager,
      stadion,
      players,
    } = new DetailedTeam(payload);

    expect(name).toEqual(payload.name);
    expect(manager).toEqual(payload.manager);
    expect(stadion).toEqual(payload.stadion);
    expect(players).toEqual([]);
  });
});
