const path = require('path');
const { nextI18NextRewrites } = require('next-i18next/rewrites');

const localeSubpaths = {};

module.exports = {
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  images: {
    disadisableStaticImages: true,
  },
  publicRuntimeConfig: {
    localeSubpaths,
  },
  cleanDistDir: true,
  cssModules: true,
  webpack: function (config) {
    return config;
  },
};
