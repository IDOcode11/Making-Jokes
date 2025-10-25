const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 4000;

//Initializing app
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

//Root route
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, "public", "index.html"));
})

//Joke route
app.get('/joke', async (req, res) =>{
    try {
        const response = await fetch("https://icanhazdadjoke.com/", {headers:{Accept: 'text/plain'}});
        let joke = await response.text(); //Converts promise into actual data

        console.log("Code 201: Joke created successfully");
        res.status(201).send(joke);

    } catch (error) {
        res.status(500).send("Error on joke call!");
    }
});

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})