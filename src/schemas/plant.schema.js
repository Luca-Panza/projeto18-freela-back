import joi from "joi";

export const plantSchema = joi.object({
  plantName: joi.string().trim().required(),
  typeId: joi.number().min(0).required(),
  isAvailable: joi.boolean().required(),
  price: joi.number().min(0).required(),
  image: joi.string().uri().trim().required(),
});
