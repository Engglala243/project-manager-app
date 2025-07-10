import api from "../axios";

export const projectsService = {
  // Get all projects
  getAllProjects: async () => {
    return await api.get("/projects");
  },

  // Get project by ID
  getProjectById: async (projectId) => {
    return await api.get(`/projects/${projectId}`);
  },
};
