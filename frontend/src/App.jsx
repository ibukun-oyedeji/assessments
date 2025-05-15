import { useEffect, useState } from "react";

export default function App() {
	const [tasks, setTasks] = useState([]);
	const [taskInput, setTaskInput] = useState("");

	useEffect(() => {
		fetch("http://localhost:4000/tasks")
			.then((res) => res.json())
			.then(setTasks);
	}, []);

	const addTask = async () => {
		if (!taskInput.trim()) return;
		const res = await fetch("http://localhost:4000/tasks", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ title: taskInput }),
		});
		const newTask = await res.json();
		setTasks([...tasks, newTask]);
		setTaskInput("");
	};

	return (
		<div style={{ padding: 20 }}>
			<h1>Task Tracker</h1>
			<input
				value={taskInput}
				onChange={(e) => setTaskInput(e.target.value)}
				placeholder="New task"
			/>
			<button onClick={addTask}>Add Task</button>
			<ul>
				{tasks.map((t) => (
					<li key={t.id}>{t.title}</li>
				))}
			</ul>
		</div>
	);
}
