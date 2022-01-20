const InvariantError = require('./InvariantError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'ADD_TEAM.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat team karena data tidak lengkap'),
  'ADD_TEAM.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat team karena tipe data tidak sesuai'),
  'ADD_PLAYER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat menambahkan pemain ke tim karena data tidak lengkap'),
  'ADD_PLAYER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat menambahkan pemain ke tim karena tipe data tidak sesuai'),
  'DETAIL_TEAM.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak bisa mendapatkan data tim karena data tidak lengkap'),
  'DETAIL_PLAYER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak bisa mendapatkan data pemain karena data tidak lengkap'),
};

module.exports = DomainErrorTranslator;
