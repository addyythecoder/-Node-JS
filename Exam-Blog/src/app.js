const express = require('express');
const port = 9999;
const app = express();

const dbconnect = require('./config/db.connection');
dbconnect();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/uploads', express.static('src/uploads'));

app.get('/', (req,res)=>{
    res.send("Blog API running 🚀");
});

app.use('/api', require('./routes/index.routes'));

app.listen(port, ()=>{
    console.log(`Server Start At http://localhost:${port}`);
});
