import { celebrate, Joi } from 'celebrate';

const validateCreatePoint = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2),
    email: Joi.string().email().required(),
    whatsapp: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    city: Joi.string().required(),
    uf: Joi.string().required().max(2),
    items: Joi.string().regex(/\d,?/).required(),
  }),
}, {
  abortEarly: false,
});

export default validateCreatePoint;
