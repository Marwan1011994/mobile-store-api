const { schema } = require("../models/user.model")

const validate = (Schema)=>{
    return (req,res,next)=>{
        // console.log(req.body)
        // res.send("done")

        const {error} = Schema.validate(req.body,{abortEarly:false})
        // console.log(error)
        if(error){
            let errMsg = error.details.map((err)=>{
                return {message : err.message , path : err.path}
            })
            res.status(400).send( errMsg)
        }
        next()
        // console.log(error)
    }
}

module.exports = validate