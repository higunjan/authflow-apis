const Joi = require('joi')

const registerSchema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: false } }),
    // image: Joi.string().required(),
    password: Joi.string().min(6).max(30).regex(/^[a-zA-Z0-9!@#$%^&*_-]{6,30}$/).required(),
    skill:  Joi.string().required()
})


module.exports = {
    registerSchema
}