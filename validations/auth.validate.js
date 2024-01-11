const Joi = require("joi")
let password = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
module.exports = {
    registerationSchema : Joi.object().keys({
        name : Joi.string().min(3).max(30).required().messages({
            "any.required" : "name is required"
    }),
        email : 
        Joi.string().email().min(3).max(30).required().messages({
            "any.required" : "email is required","string.email":"invalid email"
        }),
        password : 
        Joi.string().regex(password).min(8).required().messages({
            "any.required" : "password is required"
        }),
        address : 
        Joi.string().min(3).max(30).required().messages({
            "any.required" : "address is required"
        }),
        // nationlId : Joi.string().min(14).max(14).required().messages({"any.required" : "nationlId is required"}),
        nationlId : 
        Joi.number().integer().min(10000000000000).max(99999999999999).required().messages({
            "any.required" : "nationlId is required",
            "number.min":"Nationl Id must be equal 14 digit",
            "number.max":"Nationl Id must be equal 14 digit"
        }),
        phone :
         Joi.string().regex(/^01\d{9}$/).min(11).max(11).required().messages({
            "any.required" : "phone is required"
        }),
    }),
    loginSchema:Joi.object().keys({
        email : 
        Joi.string().email().min(3).max(30).required().messages({
            "any.required" : "email is required","string.email":"invalid email"
        }),
        password : 
        Joi.string().min(8).required().messages({
            "any.required" : "password is required"
        }),
    })
}