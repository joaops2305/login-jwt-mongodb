import express from 'express';
import database from './database/dbconnet.js';

const router = express.Router();

import acessos from './Controllers/Acesso.js';
import  Usuarios from './Controllers/Usuarios.js';

router.get('/', (req, res) => {
     res.send(JSON.stringify({}));
});

router.post('/', acessos.connect);

router.get('/logout', acessos.desconecta);

router.get('/users', acessos.conectado, async (req, res) => {
     return await Usuarios.index(req, res);
});

router.get('/users/:id', acessos.conectado, async (req, res) => {     
     return await Usuarios.show(req, res);
});

router.post('/users/', acessos.conectado, async (req, res) => {      
     return await Usuarios.store(req, res);
});

router.put('/users/:id', acessos.conectado, async (req, res) => {  
     return await Usuarios.update(req, res);
});

router.delete('/users/:id', acessos.conectado, async (req, res) => {  
     return await Usuarios.delete(req, res);
});

export default router;