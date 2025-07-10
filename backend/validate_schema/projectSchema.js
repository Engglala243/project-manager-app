const Joi = require("joi")

const createProjectSchema = Joi.object({
  name: Joi.string().min(2).max(255).required().messages({
    "string.empty": "Project name is required",
    "string.min": "Project name must be at least 2 characters long",
    "string.max": "Project name cannot exceed 255 characters",
  }),
  description: Joi.string().min(10).required().messages({
    "string.empty": "Project description is required",
    "string.min": "Project description must be at least 10 characters long",
  }),
  image_url: Joi.string().uri().optional().allow("").messages({
    "string.uri": "Image URL must be a valid URL",
  }),
  created_by: Joi.string().optional().default("admin"),
  updated_by: Joi.string().optional().default("admin"),
})

const updateProjectSchema = Joi.object({
  name: Joi.string().min(2).max(255).optional(),
  description: Joi.string().min(10).optional(),
  image_url: Joi.string().uri().optional().allow(""),
  updated_by: Joi.string().optional().default("admin"),
  is_active: Joi.boolean().optional(),
  is_deleted: Joi.boolean().optional(),
})

module.exports = {
  createProjectSchema,
  updateProjectSchema,
}
