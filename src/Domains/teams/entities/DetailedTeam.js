class DetailedTeam {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      name,
      manager,
      stadion,
      players,
    } = payload;

    this.name = name;
    this.manager = manager;
    this.stadion = stadion;
    this.players = players;
  }

  _verifyPayload({
    name,
    manager,
    stadion,
    players,
  }) {
    if (!name || !manager || !stadion || !players) {
      throw new Error('DETAILED_TEAM.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof name !== 'string' || typeof manager !== 'string' || typeof stadion !== 'string' || !Array.isArray(players)) {
      throw new Error('DETAILED_TEAM.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = DetailedTeam;
