const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Conecta o bd com MongoDB
mongoose.connect("mongodb+srv://enzocalasans:1234554321@cluster0.9xqz2.mongodb.net/")

// Confirma que o servidor esta ativo

app.get("/", (req,res) => {
    res.send("Express App está rodando")
})

//Esquema criação do modelo de usuario para armazenar informações no MongoDB
const Users = mongoose.model('users', {
    name: {
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object
    },
    date:{
        type:Date,
        default:Date.now,
    },
})

// Criando Endpoint para registro de usuario
app.post('/cadastro',async (req,res) =>{
    let check = await Users.findOne({email:req.body.email})
    if(check){
        return res.status(400).json({success:false,error:"usuário existente encontrado com o mesmo endereço de e-mail"})
    }
    let cart = {};
    for (let i = 0; i < 300; i++){
        cart[i] = 0;
    }
    const user = new Users({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })
    await user.save()
    
    const data = {
        user:{
            id:user.id
        }
    }
    const token = jwt.sign(data, 'secret_ecom');
    res.json({success:true, token})
})

//criando endpoint para login de usuario
app.post('/login', async (req,res) =>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user: {
                    id:user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({success:true,token});
        }
        else{
            res.json({success:false, errors:"Senha errada"})
        }
    }
    else{
        res.json({success:false, errors:"Email errado"})
    }
})

app.listen(port, (error) =>{
    if(!error){
        console.log("Server está rodando na porta " + port)
    } else{
        console.log("Error: " + error)
    }
})

