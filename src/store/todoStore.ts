import { Task } from "../types";
import { makeAutoObservable } from 'mobx';

export class TodoStore {
	tasks: Task[] = [];
	filter: "all" | "active" | "completed" = "all";
	modal: Task | null = null;
	isOpen: boolean = false;

	constructor() {
		makeAutoObservable(this);
		this.load();
	}

	load() {
		const saved = localStorage.getItem("todo-list");
		this.tasks = saved ? JSON.parse(saved) : [];
	}

	save() {
		localStorage.setItem("todo-list", JSON.stringify(this.tasks));
	}

	addTask(value: string) {
		this.tasks.unshift({
			id: Math.random(),
			value,
			completed: false,
		});
		this.save();
	}

	removeTask(id: number) {
		this.tasks = this.tasks.filter(t => t.id !== id);
		this.save();
	}

	toggleTask(id: number) {
		const task = this.tasks.find(t => t.id === id);
		if (task) task.completed = !task.completed;
		this.save();
	}

	openModal(id: number) {
		this.modal = this.tasks.find(t => t.id === id) || null;
		this.isOpen = true;
	}

	closeModal() {
		this.isOpen = false;
		this.modal = null;
	}

	updateTask(id: number, value: string) {
		const task = this.tasks.find(t => t.id === id);
		if (task) task.value = value;
		this.save();
	}

	setFilter(filter: "all" | "active" | "completed") {
		this.filter = filter;
	}

	get filteredTasks() {
		if (this.filter === "active") return this.tasks.filter(t => !t.completed);
		if (this.filter === "completed") return this.tasks.filter(t => t.completed);
		return this.tasks;
	}
}

export const todoStore = new TodoStore();