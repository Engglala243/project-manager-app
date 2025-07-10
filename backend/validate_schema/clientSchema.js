const Joi = require("joi")

const createClientSchema = Joi.object({
  name: Joi.string().min(2).max(255).required().messages({
    "string.empty": "Client name is required",
    "string.min": "Client name must be at least 2 characters long",
    "string.max": "Client name cannot exceed 255 characters",
  }),
  description: Joi.string().min(10).required().messages({
    "string.empty": "Client description is required",
    "string.min": "Client description must be at least 10 characters long",
  }),
  designation: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Client designation is required",
    "string.min": "Client designation must be at least 2 characters long",
    "string.max": "Client designation cannot exceed 100 characters",
  }),
  image_url: Joi.string().uri().optional().allow("").messages({
    "string.uri": "Image URL must be a valid URL",
  }),
  created_by: Joi.string().optional().default("admin"),
  updated_by: Joi.string().optional().default("admin"),
})

const updateClientSchema = Joi.object({
  name: Joi.string().min(2).max(255).optional(),
  description: Joi.string().min(10).optional(),
  designation: Joi.string().min(2).max(100).optional(),
  image_url: Joi.string().uri().optional().allow(""),
  updated_by: Joi.string().optional().default("admin"),
  is_active: Joi.boolean().optional(),
  is_deleted: Joi.boolean().optional(),
})

module.exports = {
  createClientSchema,
  updateClientSchema,
}
