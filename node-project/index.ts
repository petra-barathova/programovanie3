
import fs from "fs";
import { Books, LiteBooks } from "./types/Books";
const Informations = fs.readFileSync("Informations.json");
const oneinfjson : LiteBooks[] = JSON.parse(Informations.toString());
const infjson : Books[] = JSON.parse(Informations.toString());
let id : number [] = []; let id2 : number [] = [];



oneinfjson.forEach(el => {
  id.push(el.ID);
});

infjson.forEach(el => {
  id2.push(el.ID);
});

//endpointy
import express from "express"
import cors from "cors"
import bodyParser, { json, urlencoded } from "body-parser"
import http from "http"

let app; 

function createServer(){
  app= express();
  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: false}));

  http.createServer(app).listen(2700, () =>{
      console.log("Running server on port 2700");

  })
  app.get("/api/library/book/:id/info",(req ,res) =>{
    const Id = parseInt(req.params["id"]);
     if(id2.includes(Id)){
      res.json({id:oneinfjson[Id-1].ID, Author: oneinfjson[Id-1].Author, Name:oneinfjson[Id-1].Name, Genre :oneinfjson[Id-1].Genre });
      console.log(oneinfjson[Id-1].ID, oneinfjson[Id-1].Author,oneinfjson[Id-1].Name,oneinfjson[Id-1].Genre,);

    }
    else{
      res.json("Nenasiel som knihu s daným ID");
    }
    }
  )

  app.post("/api/library/book/:id/info",(req ,res) =>{
    const Id =parseInt(req.params["id"]);
   res.json(infjson[Id-1]);
   console.log(infjson[Id-1]);
  
  })
}

createServer();

