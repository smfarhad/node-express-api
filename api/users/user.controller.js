const{genSaltSync,hashSync} = require("bcrypt");
const{create} = require('../users/user.service');
module.exports ={
    createUser:(req,res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password,salt);
        create(body,(err,results)=>{
            if (err) {
            console.log(err);
                 return res.status(500).json({
                     sucess:0,
                     message:"Database Connection error"
                 });
            }
            return res.status(200).json({
                success:1,
                data:{body}
            });
        });
    }
}