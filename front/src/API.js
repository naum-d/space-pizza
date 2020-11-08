import axios from 'axios';

const AppAPI = () => {
  const request = (url, extra = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    };

    const token = localStorage.getItem('token');
    if (!!token) {
      headers['Authorization'] = token;
    }

    extra.headers = extra.headers || {};

    return new Promise((resolve, reject) => {
      axios({
        url,
        timeout: 50 * 1000,

        ...extra,
        headers: {
          ...headers,
          ...extra.headers,
        },
      })
        .then(resp => {
          !!resp.data.errors ? reject(resp.data.errors) : resolve(resp.data);
        })
        .catch(error => reject(error?.response?.data));
    });
  };

  return {
    request,
  };
};

export default AppAPI();
