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

const client = require("prom-client");
const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics();

app.get("/metrics", async (req, res) => {
	res.set("Content-Type", client.register.contentType);
	res.end(await client.register.metrics());
});
