import { useState } from "react";

interface InputTodoProps {
	addValue: (value: string) => void;
}

export const InputTodo = ({ addValue }: InputTodoProps) => {

	const [value, setValue] = useState < string > ('')

	const handleAddTodo = () => {
		if (!value.trim()) return;
		addValue(value);
		setValue("");
	}

	return (
		<div className="input_todo">
			<input
				value={value}
				className="input"
				type="text"
				placeholder="Введите текст..."
				onChange={e => setValue(e.target.value)}

			/>
			<button onClick={handleAddTodo}
				className="btn_add" >
				Добавить
			</button>
		</div>
	)
}