'use strict';

/**
 *  todo controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { ValidationError } = require('@strapi/utils').errors;
const { isObject } = require('lodash/fp');

module.exports = createCoreController('api::todo.todo', ({ strapi }) => ({

  async find(ctx) {
    ctx.query.filters = {
      author: {
        id: ctx.state.user.id,
      },
    };
    return super.find(ctx);
  },

  async create(ctx) {
    // super.create can be located by:
    // console.log(super.create.toString());
    // then ag 'some code from the console.log'

    const { query, body: { data } } = ctx.request;

    if (!isObject(data) || !data.content) {
      throw new ValidationError('Missing "data" payload in the request body');
    }

    const sanitizedInputData = {
      ...(await this.sanitizeInput(data, ctx)),
      author: {
        id: ctx.state.user.id,
      },
    };

    const todo = await strapi.service('api::todo.todo').create({
      ...query,
      data: sanitizedInputData,
    });
    const sanitizedEntity = await this.sanitizeOutput(todo, ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));
