import { Header } from "./componets/Header";
import { InputTodo } from "./componets/InputTodo";
import { ListTodo } from "./componets/ListTodo";
import { Modal } from "./componets/Modal";
import './App.css';
import { observer } from "mobx-react-lite";
import { todoStore } from "./store/todoStore";


const App = observer(() => {
	const store = todoStore;

	return (
		<div className="container">
			<div className="container_list">
				<Header />
				<InputTodo addValue={(v) => store.addTask(v)} />

				<div className="btn_filterblock ">
					<button className={`btn_filter ${store.filter === 'all' ? 'active' : ''}`} onClick={() => store.setFilter('all')}>All List</button>

					<button className={`btn_filter ${store.filter === 'active' ? 'active' : ''}`} onClick={() => store.setFilter('active')}>Active List</button>

					<button className={`btn_filter ${store.filter === 'completed' ? 'active' : ''}`} onClick={() => store.setFilter('completed')}>Completed List</button>
				</div>

				<ListTodo
					tasks={store.filteredTasks}
					removeTodo={(id) => store.removeTask(id)}
					editTodo={(id) => store.openModal(id)}
					toggleTask={(id) => store.toggleTask(id)}
				/>

				{store.isOpen && store.modal &&
					<Modal
						isClosed={() => store.closeModal()}
						modal={store.modal}
						update={(value) => store.updateTask(store.modal!.id, value)}
					/>}
			</div>
		</div>
	);
})

export default App;