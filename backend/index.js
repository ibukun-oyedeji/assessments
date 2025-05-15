const express = require("express");
const app = express();
app.use(express.json());

let tasks = [];

app.get("/tasks", (req, res) => res.json(tasks));
app.post("/tasks", (req, res) => {
	const task = { id: Date.now(), ...req.body };
	tasks.push(task);
	res.status(201).json(task);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

const cors = require("cors");
app.use(cors());
