import api from "../axios";

export const newsletterService = {
  // Subscribe to newsletter
  subscribe: async (email) => {
    return await api.post("/subscribers", { email });
  },

  // Unsubscribe from newsletter
  unsubscribe: async (email) => {
    return await api.post("/subscribers/unsubscribe", { email });
  },
};
