const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = 4000;
const MONGO_URI = process.env.MONGO_URI;

// Routers
const userRouter = require("./routes/user");

app.use(
	cors({
		origin: "http://localhost:5173",
	})
);
app.use(express.json());
app.use('/api/user', userRouter);

app.get("/", (req, res) => {
	res.send("Welcome to the quiz application api!");
});

mongoose
	.connect(MONGO_URI)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
