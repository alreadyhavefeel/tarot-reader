let mockMatch = { minWidth1224: true };

function useMediaQuery(query) {
  if (!query) return false;
  const { minWidth, maxWidth } = query;

  if (minWidth === 1824) return !!mockMatch.minWidth1824;
  if (minWidth === 1224 && !maxWidth) return !!mockMatch.minWidth1224;
  if (minWidth === 767 && maxWidth === 1224) return !!mockMatch.tablet;
  if (maxWidth === 766) return !!mockMatch.mobile;
  return false;
}

function __setMediaQueryMatch(overrides) {
  mockMatch = {
    minWidth1824: false,
    minWidth1224: false,
    tablet: false,
    mobile: false,
    ...overrides,
  };
}

function __resetMediaQuery() {
  mockMatch = { minWidth1224: true };
}

module.exports = { useMediaQuery, __setMediaQueryMatch, __resetMediaQuery };
module.exports.default = { useMediaQuery };
