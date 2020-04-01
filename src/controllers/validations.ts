import Joi, { ValidationResult } from '@hapi/joi';

module Validators {
    // Register
    export const registerValidator = (data: any) => {
        console.log(data);
        const schema = Joi.object({
            Username: Joi.string()
                .min(6).required(),
            Password: Joi.string()
                .min(6).required()
        });
        return schema.validate(data); 
    }
    
    // Login
    export const loginValidator = (data: any) => {
        const schema = Joi.object({
            Username: Joi.string()
            .min(6).required(),
            Password: Joi.string()
            .min(6).required()
        });
        return schema.validate(data);
    }

}
export default Validators;
// export default registerValidator;
// export default loginValidator;


// module.exports.registerValidation = registerValidator;
// module.exports.loginValidation = loginValidator;
