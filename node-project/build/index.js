"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Informations = fs_1.default.readFileSync("Informations.json");
const oneinfjson = JSON.parse(Informations.toString());
let id = [];
let id2 = [];
let infjson = JSON.parse(fs_1.default.readFileSync("Informations.json").toString());
let myMap = new Map();
infjson.forEach(element => {
    myMap.set(element.ID, element);
});
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const http_1 = __importDefault(require("http"));
/**books with lowercase values - array */
let checking = JSON.parse(Informations.toString().toLowerCase());
let findBook = new Array();
checking.forEach(e => {
    findBook.push(e);
});
let app;
function createServer() {
    app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use((0, body_parser_1.json)());
    app.use((0, body_parser_1.urlencoded)({ extended: false }));
    http_1.default.createServer(app).listen(2500, () => {
        console.log("Running server on port 2500");
    });
    /**If the list contains specific id, it finds the book with that Id and respons information about it */
    app.get("/api/library/book/:id/info", (req, res) => {
        const Id = parseInt(req.params["id"]);
        if (myMap.has(Id)) {
            res.json({ id: oneinfjson[Id - 1].ID, Author: oneinfjson[Id - 1].Author, Name: oneinfjson[Id - 1].Name, Genre: oneinfjson[Id - 1].Genre });
            console.log(oneinfjson[Id - 1].ID, oneinfjson[Id - 1].Author, oneinfjson[Id - 1].Name, oneinfjson[Id - 1].Genre);
        }
        else {
            res.json("Nenasiel som knihu s daným ID");
            console.log("Nenasiel som knihu s daným ID");
        }
    });
    /**If the list contains specific id, it finds the book with that Id and response information about it */
    app.post("/api/library/book/:id/info", (req, res) => {
        const Id = parseInt(req.params["id"]);
        if (myMap.has(Id)) {
            res.json(infjson[Id - 1]);
            console.log(infjson[Id - 1]);
        }
        else {
            res.json("Nenasiel som knihu s daným ID");
            console.log("Nenasiel som knihu s daným ID");
        }
    });
    /**If all the information are correct it puts a new book to the list and generates a random Id for it */
    app.put("api/library/book/add", (req, res) => {
        let Id = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER));
        let input = req.body;
        let put = {
            "ID": Id,
            "Name": input["Name"],
            "Author": input["Author"],
            "Genre": input["Genre"],
            "Year": input["Year"],
            "Publisher": input["Publisher"],
            "Country": input["Country"],
            "Pages": input["Pages"],
        };
        if (put.Name == undefined || put.Author == undefined || put.Genre == undefined || put.Year == undefined || put.Publisher == undefined || put.Country == undefined || put.Pages == undefined) {
            res.json("Údaje boli zadané nesprávne, skús to znova");
            console.log("Údaje boli zadané nesprávne, skús to znova");
        }
        else {
            myMap.set(Id, put);
            let info = Array.from(myMap.values());
            const stringjason = JSON.stringify(info, null, 2);
            fs_1.default.writeFile("Informations.json", stringjason, (error) => {
                if (error) {
                    throw error;
                }
                else {
                    res.json("Kniha bola pridaná do zoznamu");
                    console.log("Kniha bola pridaná do zoznamu");
                }
            });
        }
    });
    /**It finds and response every book that has similiar name of the book to the given one */
    app.post("api/library/book/find/name", (req, res) => {
        let title = req.body;
        let find = {
            "Name": title["Name"],
        };
        console.log(find);
        let filterbooksname = findBook.filter(e => e.Name.includes(find.Name.toLowerCase()));
        filterbooksname.forEach((e) => {
            console.log(e);
            res.json(e);
        });
    });
    /**It finds and response every book that has similiar name of the Author to the given one */
    app.post("api/library/book/find/name", (req, res) => {
        let a = req.body;
        let find = {
            "Author": a["Author"],
        };
        console.log(find);
        let aut = find.Author.toString();
        let filterbooksauthor = findBook.filter(e => e.Author.toString().includes(aut.toLowerCase()));
        filterbooksauthor.forEach((e) => {
            console.log(e);
            res.json(e);
        });
    });
    app.delete("/api/library/book/:id/delete", (req, res) => {
        const Id = parseInt(req.params["id"]);
        if (myMap.has(Id)) {
            myMap.delete(Id);
            let info = Array.from(myMap.values());
            const deletejason = JSON.stringify(info, null, 2);
            console.log(info);
            fs_1.default.writeFile("Informations.json", deletejason, (error) => {
                if (error) {
                    throw error;
                }
                else {
                    res.json("Kniha bola odstránená zo zoznamu");
                    console.log("Kniha bola odstránená zo zoznamu");
                }
            });
        }
        else {
            res.json("Nenasiel som knihu s daným ID");
            console.log("Nenasiel som knihu s daným ID");
        }
    });
}
createServer();
