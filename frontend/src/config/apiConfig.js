const BASE_URL = 'https://8000-fantomen31-eponadrf-tr3makianj4.ws.codeinstitute-ide.net/api';

const apiConfig = {
  profiles: {
    getCurrentUser: { method: 'GET', url: `${BASE_URL}/profiles/me/` },
    get: (id) => ({ method: 'GET', url: `${BASE_URL}/profiles/${id}/` }),
    update: (id) => ({ method: 'PUT', url: `${BASE_URL}/profiles/${id}/` }),
  },
  // Add other resources here (cities, clubs, events, etc.)
};

export default apiConfig;