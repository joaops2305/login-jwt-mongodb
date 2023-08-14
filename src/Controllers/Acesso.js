import mongoose from "mongoose";
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

//Import Modelo Esquema do Usuario
import Users from "../models/Usuarios-Schema.js";

class acessos{
     //
     async connect(req, res){
         const email = req.body.email;
         const password = req.body.password;

         if(!email || !password)
             return res.send({ error: 'Dados Insuficientes.'});

         const Find = await Users.findOne({email:email})
         .then(response =>{
             return response;
         }).catch(erro => {
             return { erro:erro }
         });
        
         if(Find == null || Find.erro)
             return	res.send({ error: 'Email Invalido'});	 

         const checkPsswd = await bcrypt.compare(password, Find.password).then(checkPsswd => {
             return checkPsswd;
         });

         if(!checkPsswd)
             return	res.send({ error: 'Password Invalido'});	

         const Token = await jsonwebtoken.sign({
             id: Find._id,
             name: Find.name,
             email: Find.email
         }, process.env.SECRET_TOKEN);		 

         res.cookie('Token', Token);
         res.sendStatus(200);
     }

     //
     async conectado(req, res, next){
         const Auth = req.cookies.Token || null;

         if(typeof(Auth) == "undefined" || Auth == '' || Auth == null){
              return res.send({ erro:{ login: 'Não Autorizado.' }});
         }else{
             try{
                 const Token = await jsonwebtoken.verify(Auth, process.env.SECRET_TOKEN);
                 next();
             }catch{
                 return res.send({ erro:{ login: 'Não Autorizado.' }});
             }
         }
     }

     //
 	 async desconecta(req, res){
         res.clearCookie('Token');
         res.redirect('/');
     }
}

export default new acessos;