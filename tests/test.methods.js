import randomstring from 'randomstring';

/**
 * Create a random blog post
 * @return {{dataTimestamp: string, thumbnailImageUrl: *, urlTitle: *, _id: *, title: *, tags: *[]}}
 */
export function randomPost() {
  return {
    'dataTimestamp': Math.random().toString(),
    'tags': [randomstring.generate(), randomstring.generate()],
    'thumbnailImageUrl': randomstring.generate(),
    'title': randomstring.generate(),
    'urlTitle': randomstring.generate(),
    '_id': randomstring.generate(),
  };
}

/**
 * Compare the key/values between two maps
 * @param {Map} map1
 * @param {Map} map2
 * @return {boolean}
 */
export function compareMaps(map1, map2) {
  let testVal;
  if (Object.entries(map1).length !== Object.entries(map2).length) {
    return false;
  }
  for (const [key, value] of Object.entries(map1)) {
    testVal = map2[key];
    if (testVal !== value || (testVal === undefined && !map2.has(key))) {
      return false;
    }
  }
  return true;
}

/**
 * Validate that there is the required wrappers for header and footer, not their content
 * Content for the sections in their respective test files
 * @param {Object} container
 */
export function headerFooterValidation(container) {
  // header is present
  expect(container.getElementsByClassName('header-wrapper')).toHaveLength(1);
  // footer is present
  expect(container.getElementsByClassName('footer-wrapper')).toHaveLength(1);
}
