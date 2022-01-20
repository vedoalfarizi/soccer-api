class AddPlayer {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      name,
      nationality,
      position,
      team,
    } = payload;

    this.name = name;
    this.nationality = nationality;
    this.position = position;
    this.team = team;
  }

  _verifyPayload({
    name,
    nationality,
    position,
    team,
  }) {
    if ([name, nationality, position, team].some((prop) => !prop)) {
      throw new Error('ADD_PLAYER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if ([name, nationality, position, team].some((prop) => typeof prop !== 'string')) {
      throw new Error('ADD_PLAYER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddPlayer;
