// customTransformer.js
const svgTransformer = require('react-native-svg-transformer');
const cssTransformer = require('react-native-sass-transformer');

module.exports.transform = function ({ src, filename, options }) {
  if (filename.endsWith('.svg')) {
    return svgTransformer.transform({ src, filename, options });
  } else if (filename.endsWith('.scss')) {
    return cssTransformer.transform({ src, filename, options });
  } else {
    // This is the tricky part. Metro doesn't export its default transformer directly.
    // As of my last update, you need to manually point to the default transformer like this:
    const upstreamTransformer = require('metro-react-native-babel-transformer');
    return upstreamTransformer.transform({ src, filename, options });
  }
};
