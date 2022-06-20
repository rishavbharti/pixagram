import { CACHED_TIME_HEADER } from '../constants';

/**
 * Deletes the specified cache if it is cached for more than the specified duration.
 *
 * @param {Cache} cache - Cache instance
 * @param {Response} cachedResponse - Response instance
 * @param {number} cacheDuration - Duration for which the data is cached
 * @param {string} url - Name of the cache to delete
 *
 * @returns {boolean} - returns true or false depending on whether the cache was deleted.
 */
export const deleteCache = async function (
  cache,
  cachedResponse,
  cacheDuration,
  url
) {
  try {
    const cachedTime = Math.floor(
      cachedResponse.headers.get(CACHED_TIME_HEADER)
    );

    const timeElapsed = (Date.now() - cachedTime) / 1000;

    if (timeElapsed >= cacheDuration) {
      await cache.delete(url);

      return true;
    }

    return false;
  } catch (error) {
    console.error(error);
  }
};
