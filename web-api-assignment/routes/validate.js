import Joi from 'joi';


export const creationUserValidation = data => {

    const schema = Joi.object().keys( {
        username: Joi.string()
        .min(4)
        .required(),
        password: Joi.string()
        .min(5)
        .required()
    });
    const validate = schema.validate(data);
    return validate;
}

export const loginValidation = async data => {
    const schema = Joi.object().keys({
        username: Joi.string()
        .min(4)
        .required(),
        password: Joi.string()
        .min(5)
        .required()
    });
    const validate = schema.validate(data);
    return validate;
}

export const createSightingPostValidation = data => {
    const schema = Joi.object().keys( {
        username: Joi.string()
        .min(4)
        .max(20)
        .required(),
        longitude: Joi.number()
        .required(),
        latitude: Joi.number()
        .required(),
        species: Joi.string()
        .required(),
        size: Joi.string()
        .required(),
        description: Joi.string()
        .required()
        .max(200)
    });
    const validate = schema.validate(data);
    return validate;
}

