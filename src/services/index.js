export const BASE_URL = 'https://api.unsplash.com/';

export const config = {
  headers: {
    Authorization: `Client-ID ${process.env.REACT_APP_ACCESS_KEY}`,
  },
};
