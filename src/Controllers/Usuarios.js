import express, { response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

//Import Modelo Esquema do Usuario
import Users from "../models/Usuarios-Schema.js";

class UsersContollers{
     //
     async index(req, res){
         return res.send(await Users.find());
     }

     //
     async show(req, res){
         return res.send(await Users.findOne({_id:req.params.id}));
     }

     //
     async store(req, res){         
         const temp = req.body;

         if(await this.checker({email:temp.email}))	
		     return res.status(404).send('Email Já Cadastrado');

		 if(await this.checker({username:temp.username}))	
		     return res.status(404).send('Usuario Já Cadastrado');		 

		 temp.password = await bcrypt.hash(temp.password, 10);

		 const data = await Users.create(req.body);
		 return res.status(200).send(data);
     }

     //
     async update(req, res){
         const temp = req.body;

         let email = await this.checker({email:temp.email});
            
         if(email){
             if(email._id != req.params.id)
                 return res.status(404).send('Email Já Cadastrado');
         }	

         let username = await this.checker({username:temp.username});

         if(username){
             if(username._id != req.params.id)
                 return res.status(404).send('Usuario Já Cadastrado');	
         }	
         
		 if(temp.password != null)
		     temp.password = await bcrypt.hash(temp.password, 10);

		 const updt = await Users.updateOne({_id:req.params.id}, temp, { new: true });
		 res.send(updt);         
     }

     //
     async delete(req, res){
         return res.send(await Users.deleteOne({_id:req.params.id}));
     }

     //
     async checker(data){
         return await Users.findOne(data);
     }
}

const Usuarios = new UsersContollers();

export default Usuarios; 