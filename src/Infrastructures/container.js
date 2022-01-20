/* istanbul ignore file */

const { createContainer } = require('instances-container');

const teams = require('./database/array/teams');

const TeamRepositoryArray = require('./repository/TeamRepositoryArray');

const TeamRepository = require('../Domains/teams/TeamRepository');

const TeamUseCase = require('../Applications/use_case/TeamUseCase');
const PlayerUseCase = require('../Applications/use_case/PlayerUseCase');

const container = createContainer();
container.register([
  {
    key: TeamRepository.name,
    Class: TeamRepositoryArray,
    parameter: {
      dependencies: [
        {
          concrete: teams,
        },
      ],
    },
  },
]);

container.register([
  {
    key: TeamUseCase.name,
    Class: TeamUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'teamRepository',
          internal: TeamRepository.name,
        },
      ],
    },
  },
  {
    key: PlayerUseCase.name,
    Class: PlayerUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'teamRepository',
          internal: TeamRepository.name,
        },
      ],
    },
  },
]);

module.exports = container;
