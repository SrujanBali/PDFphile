import Joi from "joi"

export const infoValidation = (req, res, next) =>{
    const schema = Joi.object({
        uploadedby: Joi.string().min(3).required(),
        username: Joi.string().required(),
        filePath: Joi.string().required(),
        fileName: Joi.string().required(),
    });

    const {error} = schema.validate(req.body, { abortEarly: false});
    if(error){
        return res.status(400).json({success: false, message: "File info Validatoin Error", details: error.details.map((detail) => detail.message)});
    }
    next();
}
    
    