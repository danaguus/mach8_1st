const   PORT  =  process.env.PORT || 80

import express from "express";
import helmet from "helmet";
import path from "path";
import clsData from "./data.js";

let app  =   express();
const {pathname: _frontPath} = new URL('../ui/', import.meta.url);

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static("ui"));
app.use(helmet.noSniff());

//********************************************** GET request handlers ********************************************//
app.get("/", (req, res) => {
    res.sendFile(path.join(_frontPath, "index.html"))
})

app.post("/filter", async ( req, res ) => {
    await new clsData().GetData(req.body.toFilter)
                    .then( resp => { res.send(resp) })
                    .catch( rej => {
                        res.send(rej)
                        res.sendStatus(500)
                    } )
    res.end()
});

app.listen(PORT, () => {
    console.clear();
    console.log(`Running -> ${PORT}`)
});