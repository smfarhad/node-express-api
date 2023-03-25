const pool = require("../../config/db");

module.exports = {
    create:(data, callBack)=>{
        pool.query(
            `insert into users(fist_name,last_name,gender,email,password,number) values(?,?,?,?,?,?)`,
            [
            data.first_name,
            data.last_name,
            data.gender,
            data.email,
            data.password,
            data.number
            ],(error,results,fields)=>{
                if(error){
                   return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
};