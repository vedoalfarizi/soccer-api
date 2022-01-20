class AddTeam {
  constructor(payload) {
    this._verifyPayload(payload);

    const { name, manager, stadion } = payload;

    this.name = name;
    this.manager = manager;
    this.stadion = stadion;
    this.players = [];
  }

  _verifyPayload({ name, manager, stadion }) {
    if (!name || !manager || !stadion) {
      throw new Error('ADD_TEAM.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof name !== 'string' || typeof manager !== 'string' || typeof stadion !== 'string') {
      throw new Error('ADD_TEAM.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddTeam;
