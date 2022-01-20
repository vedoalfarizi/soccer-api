const AddTeam = require('../AddTeam');

describe('an AddTeam entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      name: 'a name',
      manager: 'a manager',
    };

    expect(() => new AddTeam(payload)).toThrowError('ADD_TEAM.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      name: true,
      manager: 'a manager',
      stadion: ['a stadion'],
    };

    expect(() => new AddTeam(payload)).toThrowError('ADD_TEAM.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create addTeam object correctly', () => {
    const payload = {
      name: 'a name',
      manager: 'a manager',
      stadion: 'a stadion',
    };

    const {
      name,
      manager,
      stadion,
      players,
    } = new AddTeam(payload);

    expect(name).toEqual(payload.name);
    expect(manager).toEqual(payload.manager);
    expect(stadion).toEqual(payload.stadion);
    expect(players).toEqual([]);
  });
});
