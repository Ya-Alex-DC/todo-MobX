import { Header } from "./componets/Header";
import { InputTodo } from "./componets/InputTodo";
import { ListTodo } from "./componets/ListTodo";
import { Modal } from "./componets/Modal";
import './App.css';
import { useState, useEffect } from "react";
import { Task } from './types';

const tasksManeger = (storageKey = 'tasks') => {
	const get = (): Task[] => {
		try {
			const saved = localStorage.getItem(storageKey);
			return saved ? JSON.parse(saved) : [];
		} catch {
			return [];
		}
	}
	const set = (tasks: Task[]): void => {
		localStorage.setItem(storageKey, JSON.stringify(tasks));
	}
	return {
		set, get
	}
}

function App() {
	const { set, get } = tasksManeger("todo-list");
	const [tasks, setTasks] = useState < Task[] > (get);
	const [open, setOpen] = useState < boolean > (false);
	const [modal, setModal] = useState < Task | null > (null);
	const [filter, setFilter] = useState < "all" | "active" | "completed" > ('all');

	useEffect(() => {
		set(tasks)
	}, [tasks])

	const addValue = (value: string): void => {
		const task = {
			id: Math.random(),
			value,
			completed: false,
		}
		setTasks((prevTask) => {
			return [task, ...prevTask]
		})
	}

	const editTodo = (id: number): void => {
		isClosed()
		setTimeout(() => {
			setModal(tasks.find((item) => item.id === id) || null)
			setOpen(true)
		}, 0)
	}

	const removeTodo = (id: number): void => {
		setTasks(tasks.filter(todo => todo.id !== id))
		isClosed()
	}

	const isClosed = (): void => {
		setOpen(false)
		setModal(null)
	}

	const toggleTask = (id: number): void => {
		setTasks((prev) =>
			prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
		);
	}

	const filteredTasks = tasks.filter(task => {
		if (filter === 'active') return !task.completed;
		if (filter === 'completed') return task.completed;
		return true;
	});

	return (
		<div className="container">
			<div className="container_list">
				<Header />
				<InputTodo addValue={addValue} />

				<div className="btn_filterblock ">
					<button className={`btn_filter ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All List</button>

					<button className={`btn_filter ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')}>Active List</button>

					<button className={`btn_filter ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}>Completed List</button>
				</div>

				<ListTodo
					tasks={filteredTasks}
					removeTodo={removeTodo}
					editTodo={editTodo}
					toggleTask={toggleTask}
				/>

				{open && modal &&
					<Modal isClosed={isClosed} modal={modal} setTasks={setTasks} />}


			</div>
		</div>
	);
}

export default App;