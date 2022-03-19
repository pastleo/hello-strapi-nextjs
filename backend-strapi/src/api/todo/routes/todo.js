'use strict';

/**
 * todo router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::todo.todo', {
  config: {
    findOne: {
      policies: ['author-only'],
    },
    update: {
      policies: ['author-only'],
    },
    delete: {
      policies: ['author-only'],
    },
  },
});
