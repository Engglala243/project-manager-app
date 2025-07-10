import api from "../axios";

export const clientsService = {
  // Get all clients
  getAllClients: async () => {
    return await api.get("/clients");
  },

  // Get client by ID
  getClientById: async (clientId) => {
    return await api.get(`/clients/${clientId}`);
  },
};
