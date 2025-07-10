const Joi = require("joi")

const createContactSchema = Joi.object({
  full_name: Joi.string().min(2).max(255).required().messages({
    "string.empty": "Full name is required",
    "string.min": "Full name must be at least 2 characters long",
    "string.max": "Full name cannot exceed 255 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email address",
  }),
  phone: Joi.string()
    .min(10)
    .max(15)
    .pattern(/^[0-9+\-\s()]+$/)
    .required()
    .messages({
      "string.empty": "Phone number is required",
      "string.min": "Phone number must be at least 10 characters long",
      "string.max": "Phone number cannot exceed 15 characters",
      "string.pattern.base": "Please provide a valid phone number",
    }),
  city: Joi.string().min(2).max(100).required().messages({
    "string.empty": "City is required",
    "string.min": "City must be at least 2 characters long",
    "string.max": "City cannot exceed 100 characters",
  }),
})

module.exports = {
  createContactSchema,
}
