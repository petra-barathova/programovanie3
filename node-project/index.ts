
import fs from "fs";
import { Books, LiteBooks } from "./types/Books";
const Informations = fs.readFileSync("Informations.json");
const oneinfjson : LiteBooks[] = JSON.parse(Informations.toString());

let id : number [] = []; let id2 : number [] = [];

let infjson : any[] = JSON.parse(fs.readFileSync("Informations.json").toString());
let myMap = new Map<Number, any>();
infjson.forEach(element => {
 myMap.set(element.ID, element);
})

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

  http.createServer(app).listen(2500, () =>{
      console.log("Running server on port 2500");

  })
  app.get("/api/library/book/:id/info",(req ,res) =>{
    const Id = parseInt(req.params["id"]);
     if(myMap.has(Id)){
      res.json({id:oneinfjson[Id-1].ID, Author: oneinfjson[Id-1].Author, Name:oneinfjson[Id-1].Name, Genre :oneinfjson[Id-1].Genre });
      console.log(oneinfjson[Id-1].ID, oneinfjson[Id-1].Author,oneinfjson[Id-1].Name,oneinfjson[Id-1].Genre,);

    }
    else{
      res.json("Nenasiel som knihu s daným ID");
      console.log("Nenasiel som knihu s daným ID");
    }
    }
  )

  app.post("/api/library/book/:id/info",(req ,res) =>{
    const Id =parseInt(req.params["id"]);
    if(myMap.has(Id)){
   res.json(infjson[Id-1]);
   console.log(infjson[Id-1]);
  }
  else{
    res.json("Nenasiel som knihu s daným ID");
      console.log("Nenasiel som knihu s daným ID");
  }
  })
  app.put("api/library/book/:id/add", (req, res)=>{
    const Id =parseInt(req.params["id"]);
    if(myMap.has(Id)){
      res.json("Kniha so zadaným id už existuje");
      console.log("Kniha so zadaným id už existuje");
     }
     else{
       let input : Books = req.body;
       let put : Books = {
        "ID" : Id,
        "Name" : input["Name"],
        "Author" : input["Author"],
        "Genre": input["Genre"],
        "Year" :input["Year"],
        "Publisher" : input["Publisher"],
        "Country": input["Country"]  ,
        "Pages" : input["Pages"],

       }
       if(put.Name==undefined || put.Author == undefined || put.Genre == undefined || put.Year == undefined || put.Publisher == undefined || put.Country == undefined || put.Pages == undefined){
        res.json("Údaje boli zadané nesprávne, skús to znova");
        console.log("Údaje boli zadané nesprávne, skús to znova");
       }
       else{
        myMap.set(Id, put);
        let info = Array.from(myMap.values());
        const stringjason = JSON.stringify(info,null,2);
        fs.writeFile("Informations.json", stringjason, (error)=>{
         if(error) {
         throw error;
        }
         else{
          res.json("Kniha bola pridaná do zoznamu");
          console.log("Kniha bola pridaná do zoznamu");
         }
        })

       }
     }
  } )

  app.delete("/api/library/book/:id/delete",(req, res)=>{
    const Id =parseInt(req.params["id"]);
    if(myMap.has(Id)){
      myMap.delete(Id);
      let info = Array.from(myMap.values());
      const deletejason = JSON.stringify(info,null,2);
      console.log(info)
      fs.writeFile("Informations.json", deletejason, (error)=>{
        if(error) {
        throw error;
       }
        else{
         res.json("Kniha bola odstránená zo zoznamu");
         console.log("Kniha bola odstránená zo zoznamu");
        }
       })
    }
    else{
      res.json("Nenasiel som knihu s daným ID");
         console.log("Nenasiel som knihu s daným ID");
    }
  })
}

createServer();

