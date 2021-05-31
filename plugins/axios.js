export default function ({ $axios, store }) {
  $axios.onRequest(config => {
    // Assume all requests that starts with '/' will go the the Deloitte API
    if (config.url[0] === '/') {
      config.url = `${process.env.API_URL}${config.url}`;
      config.headers.Authorization = `Bearer ${store.getters['session/GET_TOKEN']}`;

      // Append `Timezone` header to all ACE API request.
      config.headers.Timezone = process.env.TIMEZONE;



    }
  });
}
