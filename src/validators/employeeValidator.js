import { Joi, celebrate, Segments } from "celebrate";

const role = ["President", "Manager", "Leader", "Staff"];

const employeePostValidation = celebrate({
  [Segments.BODY]: Joi.object({
    employeeNumber: Joi.number().positive().optional(),
    lastName: Joi.string().min(3).max(50).required(),
    firstName: Joi.string().min(3).max(50).required(),
    extension: Joi.string().max(50).required(),
    email: Joi.string().email().min(10).max(100).required(),
    officeCode: Joi.string().max(10).required(),
    reportsTo: Joi.number().positive().allow(null).optional(),
    jobTitle: Joi.string()
      .valid(...role)
      .required(),
  }),
});

const employeePutValidation = celebrate({
  [Segments.BODY]: Joi.object({
    employeeNumber: Joi.number().positive().forbidden().messages({
      "any.unknown": "employeeNumber should not be changed",
    }),
    lastName: Joi.string().min(3).max(50).forbidden().messages({
      "any.unknown": "lastName should not be changed",
    }),
    firstName: Joi.string().min(3).max(50).required(),
    extension: Joi.string().max(50).required(),
    email: Joi.string().email().min(10).max(100).required(),
    officeCode: Joi.string().max(10).required(),
    reportsTo: Joi.number().positive().allow(null).optional(),
    jobTitle: Joi.string()
      .valid(...role)
      .required(),
  }),
});

export { employeePostValidation, employeePutValidation };
