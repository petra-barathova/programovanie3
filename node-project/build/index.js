"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Informations = fs_1.default.readFileSync("Informations.json");
const oneinfjson = JSON.parse(Informations.toString());
const infjson = JSON.parse(Informations.toString());
let id = [];
let id2 = [];
oneinfjson.forEach(el => {
    id.push(el.ID);
});
infjson.forEach(el => {
    id2.push(el.ID);
});
//endpointy
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const http_1 = __importDefault(require("http"));
let app;
function createServer() {
    app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use((0, body_parser_1.json)());
    app.use((0, body_parser_1.urlencoded)({ extended: false }));
    http_1.default.createServer(app).listen(2500, () => {
        console.log("Running server on port 2500");
    });
    app.get("/api/library/book/:id/info", (req, res) => {
        const Id = parseInt(req.params["id"]);
        if (id2.includes(Id)) {
            res.json({ id: oneinfjson[Id - 1].ID, Author: oneinfjson[Id - 1].Author, Name: oneinfjson[Id - 1].Name, Genre: oneinfjson[Id - 1].Genre });
            console.log(oneinfjson[Id - 1].ID, oneinfjson[Id - 1].Author, oneinfjson[Id - 1].Name, oneinfjson[Id - 1].Genre);
        }
        else {
            res.json("Nenasiel som knihu s daným ID");
        }
    });
    app.post("/api/library/book/:id/info", (req, res) => {
        const Id = parseInt(req.params["id"]);
        res.json(infjson[Id - 1]);
        console.log(infjson[Id - 1]);
    });
}
createServer();
