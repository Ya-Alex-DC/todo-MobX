import { Todo } from "./Todo"
import { Task } from '../types';
import { observer } from "mobx-react-lite";

interface ListTodoProps {
	tasks: Task[];
	removeTodo: (id: number) => void;
	editTodo: (id: number) => void;
	toggleTask: (id: number) => void;
}

export const ListTodo = observer(({ tasks, removeTodo, editTodo, toggleTask }: ListTodoProps) => {

	return (
		<div className="list">
			<ul className="list_todo">
				{tasks.map(e =>
					<Todo
						key={e.id}
						{...e}
						removeTodo={removeTodo}
						editTodo={editTodo}
						toggleTask={toggleTask}
					/>)}
			</ul>
		</div>
	)
})