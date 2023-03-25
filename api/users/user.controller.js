const{genSaltSync,hashSync,compareSync} = require("bcrypt");
const{sign} = require("jsonwebtoken");

const{create,getUsers,getUserById,updateUser,deleteUser,getUserByEmail} = require('../users/user.service');

module.exports = {
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
    },
    getUsers:(req,res)=>{
        getUsers((err,results)=>{
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                data:results
            });
        });
    },
    getUserById:(req,res)=>{
        const id=req.params.id;
        getUserById(id,(err,results)=>{
            if (err) {
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:'Record not found'
                });
            }
            return res.json({
                success:1,
                message:results
            });
        });
    },
    updateUser:(req,res)=>{
        const body=req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password,salt);
        updateUser(body,(err,results)=>{
            if (err) {
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:'Failed to update user'
                });
            }
            return res.json({
                success:1,
                message:'updated successfully'
            });
        });
    },
    deleteUser:(req,res)=>{
        const body=req.body;
        deleteUser(body,(err,results)=>{
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success:0,
                    message:'Record Not found'
                });
            }
            return res.json({
                success:1,
                message:"Data deleted successfully"
            });
        });
    },
    login:(req,res)=>{
        const body=req.body;
        getUserByEmail(body.email,(err,results)=>{
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success:0,
                    message:'Invalid Email or password'
                });
            }
            const result = compareSync(body.password, results.password);
           
            if(result){
                results.password=undefined;
                const jsonToken = sign({
                        result: results
                    },'qwe1234',{
                    expiresIn: '1h'
                });
                return res.json({
                    success:1,
                    message:"login successfully",
                    token:jsonToken
                });
            }else {
                return res.json({
                    success:0,
                    message:"Invalid email or password",
                });
            }
        });
    }
}