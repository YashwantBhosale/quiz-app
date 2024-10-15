const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors(
    {
        origin: "http://localhost:3000"
    }
));

app.get("/", (req, res) => {
    res.send("Welcome to the quiz application api!");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

