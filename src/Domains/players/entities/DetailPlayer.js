class DetailPlayer {
  constructor(payload) {
    this._verifyPayload(payload);

    const { name, nationality, position } = payload;

    this.name = name;
    this.nationality = nationality;
    this.position = position;
  }

  _verifyPayload({ name, nationality, position }) {
    if (!name || !nationality || !position) {
      throw new Error('ADDED_PLAYER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof name !== 'string' || typeof nationality !== 'string' || typeof position !== 'string') {
      throw new Error('ADDED_PLAYER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = DetailPlayer;
