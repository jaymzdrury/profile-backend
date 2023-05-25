const Joi = require('joi')
const { BadRequestError } = require('../errors/bad-request')

export const Validate = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body)
            next()
        } catch (err) {
            throw new BadRequestError(`Validation failed: ${err}`)
        }
    }
}

export const Schemas = {
    data: {
        create: Joi.object({
            string: Joi.string().required()
        }),
        update: Joi.object({
            string: Joi. string().required()
        })
    }
}