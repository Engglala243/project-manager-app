const Project = require("../models/Project")
const { Op } = require("sequelize")

class ProjectService {
  async createProject(projectData) {
    try {
      const project = await Project.create(projectData)
      return project
    } catch (error) {
      throw new Error(`Error creating project: ${error.message}`)
    }
  }

  async getAllProjects(includeInactive = false) {
    try {
      const whereClause = { is_deleted: false }
      if (!includeInactive) {
        whereClause.is_active = true
      }

      const projects = await Project.findAll({
        where: whereClause,
        order: [["created_at", "DESC"]],
      })
      return projects
    } catch (error) {
      throw new Error(`Error fetching projects: ${error.message}`)
    }
  }

  async getProjectById(id) {
    try {
      const project = await Project.findOne({
        where: {
          id,
          is_deleted: false,
        },
      })
      return project
    } catch (error) {
      throw new Error(`Error fetching project: ${error.message}`)
    }
  }

  async updateProject(id, updateData) {
    try {
      const [updatedRowsCount] = await Project.update(updateData, {
        where: {
          id,
          is_deleted: false,
        },
      })

      if (updatedRowsCount === 0) {
        throw new Error("Project not found or already deleted")
      }

      return await this.getProjectById(id)
    } catch (error) {
      throw new Error(`Error updating project: ${error.message}`)
    }
  }

  async deleteProject(id) {
    try {
      const [updatedRowsCount] = await Project.update(
        { is_deleted: true, updated_by: "admin" },
        { where: { id, is_deleted: false } },
      )

      if (updatedRowsCount === 0) {
        throw new Error("Project not found or already deleted")
      }

      return true
    } catch (error) {
      throw new Error(`Error deleting project: ${error.message}`)
    }
  }
}

module.exports = new ProjectService()
