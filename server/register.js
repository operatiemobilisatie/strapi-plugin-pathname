'use strict';

module.exports = ({ strapi }) => {
  // register phase
  strapi.customFields.register({
    name: 'pathname',
    type: 'string',
    plugin: 'strapi-plugin-pathname',
    inputSize: {
      // optional
      default: 4,
      isResizable: true,
    },
  })
};
