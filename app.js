const express = require("express");
const app = express();

const PORT = process.env.PORT || 4000;

const search_routes = require("./routes/products")

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hi, I'm live");

});

app.use("/api/search", search_routes);

const start = async () =>{
    try {
        app.listen(PORT, () => {
            console.log(`${PORT} Yes I am connected`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();