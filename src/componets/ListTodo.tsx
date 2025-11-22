import { Todo } from "./Todo"
import { Task } from '../types';

interface ListTodoProps {
	tasks: Task[];
	removeTodo: (id: number) => void;
	editTodo: (id: number) => void;
	toggleTask: (id: number) => void;
}


export const ListTodo = ({ tasks, removeTodo, editTodo, toggleTask }: ListTodoProps) => {

	return (
		<div className="list">
			<ul className="list_todo">
				{tasks.map(e => <Todo
					key={e.id}
					{...e}
					removeTodo={(e) => removeTodo(e)}
					editTodo={editTodo}
					toggleTask={toggleTask}
				/>)}
			</ul>
		</div>
	)
}