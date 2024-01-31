'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('strapi-plugin-pathname')
      .service('myService')
      .getWelcomeMessage();
  },
});
