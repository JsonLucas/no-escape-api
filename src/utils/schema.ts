import joi from 'joi';

const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;

export const createUserSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email(),
    phone: joi.string().required(),
    password: joi.string().regex(passwordRegex).required(),
    confirmPassword: joi.ref('password')
});

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

export const trackingSchema = joi.object({
    vehicleName: joi.string().required().max(50),
    vehiclePlate: joi.string().required().max(8),
    description: joi.string().min(0).max(100)
});

export const updateUserSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email(),
    phone: joi.string().required(),
    password: joi.string().allow('').optional().regex(passwordRegex),
    confirmPassword: joi.string().allow('').optional().valid(joi.ref('password'))
});

export const updateProfilePictureSchema = joi.object({
    picture: joi.string().required()
});