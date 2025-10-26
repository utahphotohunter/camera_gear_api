const Joi = require("joi");

const cameraSchema = Joi.object({
  model: Joi.string().required(),
  brand: Joi.string()
    .lowercase()
    .valid(
      "fuji",
      "canon",
      "nikon",
      "lumix",
      "panasonic",
      "sony",
      "olympus",
      "minolta",
      "kodak"
    )
    .required(),
  mirrorless: Joi.string().lowercase().valid("yes", "no").required(),
  sensor: Joi.string().lowercase().valid("crop", "full", "micro").required(),
  mobility: Joi.string().lowercase().valid("low", "medium", "high").required(),
  environment: Joi.string().lowercase().valid("rugged", "basic").required(),
  weight: Joi.string().lowercase().valid("light", "medium", "heavy").required(),
  size: Joi.string().lowercase().valid("small", "medium", "large").required(),
  battery: Joi.string().lowercase().valid("short", "medium", "long").required(),
  speed: Joi.string().lowercase().valid("slow", "medium", "fast").required(),
});

const lensSchema = Joi.object({
  model: Joi.string().lowercase().required(),
  micro: Joi.string().lowercase().valid("yes", "no").required(),
  mobility: Joi.string().lowercase().valid("high", "medium", "low").required(),
  environment: Joi.string().lowercase().valid("rugged", "basic").required(),
  weight: Joi.string().lowercase().valid("light", "medium", "heavy").required(),
  size: Joi.string().lowercase().valid("small", "medium", "large").required(),
  zoom: Joi.string().lowercase().valid("wide", "medium", "tight").required(),
});

module.exports = {
  cameraSchema,
  lensSchema,
};
