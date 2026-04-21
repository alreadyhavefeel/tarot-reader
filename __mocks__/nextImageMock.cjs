const React = require('react');

function NextImageMock(props) {
  const { src, alt, width, height, ...rest } = props;
  const resolvedSrc =
    typeof src === 'object' && src !== null ? src.src || '' : src;
  return React.createElement('img', {
    src: resolvedSrc,
    alt: alt ?? '',
    width,
    height,
    ...rest,
  });
}

module.exports = NextImageMock;
module.exports.default = NextImageMock;
