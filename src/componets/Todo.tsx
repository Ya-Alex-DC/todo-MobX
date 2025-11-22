import classes from 'classnames'
import { Task } from '../types';

interface TodoProps extends Task {
  removeTodo: (id: number) => void;
  editTodo: (id: number) => void;
  toggleTask: (id: number) => void;
}

export const Todo = ({ value, removeTodo, id, editTodo, toggleTask, completed }: TodoProps) => {

	const isEditable = !completed

	return (

		<li className={classes('list-item', { list_done: completed })} >

			<span className={classes({ done: completed })}>{value}</span>
			<div className="btn_block">
				{isEditable && (<button onClick={() => editTodo(id)} className="btn_delet">
					Редактировать
				</button>)}
				<button onClick={() => removeTodo(id)} className="btn_delet">
					удалить
				</button>

				<input checked={completed}
					className="checkbox_item"
					type="checkbox"
					onChange={() => toggleTask(id)}
				>
				</input>
			</div>
		</li>

	)
}