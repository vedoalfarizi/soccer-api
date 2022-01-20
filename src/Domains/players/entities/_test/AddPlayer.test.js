const AddPlayer = require('../AddPlayer');

describe('an AddPlayer entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      name: 'David de Gea',
    };

    expect(() => new AddPlayer(payload)).toThrowError('ADD_PLAYER.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      name: 9597,
      nationality: 'Spanyol',
      position: ['GK'],
      team: 'Manchester United F.C.',
    };

    expect(() => new AddPlayer(payload)).toThrowError('ADD_PLAYER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create addPlayer object correctly', () => {
    const payload = {
      name: 'David de Gea',
      nationality: 'Spanyol',
      position: 'GK',
      team: 'Manchester United F.C.',
    };

    const {
      name,
      nationality,
      position,
      team,
    } = new AddPlayer(payload);

    expect(name).toEqual(payload.name);
    expect(nationality).toEqual(payload.nationality);
    expect(position).toEqual(payload.position);
    expect(team).toEqual(payload.team);
  });
});
