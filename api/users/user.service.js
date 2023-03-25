const pool = require("../../config/db");

module.exports = {
    create:(data, callBack)=>{
        pool.query(
            `insert into users(first_name,last_name,gender,email,password,number) values(?,?,?,?,?,?)`,
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
    },
    getUsers:callBack=>{
        pool.query(
            'select first_name,last_name,gender,email,password,number from users',
            [],
            (error,results,fields)=>{
                if (error) {
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    getUserById:(id,callBack)=>{
        pool.query(
            'select * from users where id=?',
            [id],(error,results,fields)=>{
                if (error) {
                    return callBack(error);
                }
                return callBack(null,results[0]);
            }
        );
    },
    updateUser:(data,callBack)=>{
        pool.query(`update users set first_name=?,last_name=?,gender=?,email=?,password=?,number=? where id=?`,[
            data.first_name,
            data.last_name,
            data.gender,
            data.email,
            data.password,
            data.number,
            data.id
            ],(error,results,fields)=>{
                if(error){
                   return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    deleteUser:(data,callBack)=>{
        pool.query(
            'delete from users where id=?',
            [data.id],(error,results,fields)=>{
                if (error) {
                    return callBack(error);
                }
                return callBack(null,results[0]);
            }
        );
    },
    getUserByEmail:(email,callBack)=>{
        pool.query(
            `select * from users where email = ?`,
            [email],(error,results,fields)=>{
                if (error) {
                    return callBack(error);
                }
                return callBack(null,results[0]);
            }
        );
    },
};