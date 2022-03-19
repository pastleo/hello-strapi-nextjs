'use strict';

/**
 * `author-only` policy.
 */

module.exports = async (policyContext, _config, { strapi }) => {
  const todo = await strapi.service('api::todo.todo').findOne(policyContext.params.id, { populate: { author: true }, });

  return todo.author.id === policyContext.state.user.id;
};
