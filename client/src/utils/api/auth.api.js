import api from ".";

export default {
  async login(username, password) {
    try {
      const response = api.post("/auth/login", {
        username,
        password,
      });

      return response;
    } catch (error) {
      throw error;
    }
  },

  async logout() {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      throw error;
    }
  },

  async register(username, password) {
    try {
      const response = await api.post("/auth/register", {
        username,
        password,
      });

      return response;
    } catch (error) {
      throw error;
    }
  },
};
