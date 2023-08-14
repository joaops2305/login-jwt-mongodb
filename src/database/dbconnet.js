import mongoose from 'mongoose';

mongoose.connect('mongodb://admin:admin@localhost:27017/blog',{
     useNewUrlParser: true,
     useUnifiedTopology: true
}).then(()=>{
     console.log("MongoDB Online.");
}).catch(erro => {
     console.log(erro);
});

const db = mongoose.Connection;

export default db;