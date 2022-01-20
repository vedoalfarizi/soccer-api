const DetailPlayer = require('../DetailPlayer');

describe('an DetailPlayer entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      name: 'David de Gea',
    };

    expect(() => new DetailPlayer(payload)).toThrowError('ADDED_PLAYER.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      name: 9597,
      nationality: 'Spanyol',
      position: ['GK'],
      team: 'Manchester United F.C.',
    };

    expect(() => new DetailPlayer(payload)).toThrowError('ADDED_PLAYER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create detailPlayer object correctly', () => {
    const payload = {
      name: 'David de Gea',
      nationality: 'Spanyol',
      position: 'GK',
      team: 'Manchester United F.C.',
    };

    const { name, nationality, position } = new DetailPlayer(payload);

    expect(name).toEqual(payload.name);
    expect(nationality).toEqual(payload.nationality);
    expect(position).toEqual(payload.position);
  });
});
