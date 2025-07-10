const projectService = require("../services/projectService")
const { createProjectSchema, updateProjectSchema } = require("../validate_schema/projectSchema")

class ProjectController {
  async createProject(req, res) {
    try {
      const { error, value } = createProjectSchema.validate(req.body)
      if (error) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.details.map((detail) => detail.message),
        })
      }

      const project = await projectService.createProject(value)

      res.status(201).json({
        success: true,
        message: "Project created successfully",
        data: project,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

  async getAllProjects(req, res) {
    try {
      const includeInactive = req.query.include_inactive === "true"
      const projects = await projectService.getAllProjects(includeInactive)

      res.status(200).json({
        success: true,
        message: "Projects fetched successfully",
        data: projects,
        count: projects.length,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

  async getProjectById(req, res) {
    try {
      const { id } = req.params
      const project = await projectService.getProjectById(id)

      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        })
      }

      res.status(200).json({
        success: true,
        message: "Project fetched successfully",
        data: project,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

  async updateProject(req, res) {
    try {
      const { id } = req.params
      const { error, value } = updateProjectSchema.validate(req.body)

      if (error) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.details.map((detail) => detail.message),
        })
      }

      const project = await projectService.updateProject(id, value)

      res.status(200).json({
        success: true,
        message: "Project updated successfully",
        data: project,
      })
    } catch (error) {
      if (error.message.includes("not found")) {
        return res.status(404).json({
          success: false,
          message: error.message,
        })
      }

      res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

  async deleteProject(req, res) {
    try {
      const { id } = req.params
      await projectService.deleteProject(id)

      res.status(200).json({
        success: true,
        message: "Project deleted successfully",
      })
    } catch (error) {
      if (error.message.includes("not found")) {
        return res.status(404).json({
          success: false,
          message: error.message,
        })
      }

      res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
}

module.exports = new ProjectController()
