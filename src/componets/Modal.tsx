import { useState } from "react";
import { Task } from "../types";

interface ModalProps {
	isClosed: () => void;
	setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
	modal: Task;
}

export const Modal = ({ isClosed, setTasks, modal }: ModalProps) => {

	const [count, setCount] = useState<number>(0)
	const [value, setValue] = useState<string>(modal.value)

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}

	const handleSave = () => {
		setTasks(prevTask => {
			const index = prevTask.findIndex(item => item.id === modal.id)
			if (index !== -1) prevTask[index].value = value;
			return [...prevTask]
		})
		isClosed()
	}

	return (
		<div className="overlay">
			<div className="modal">
				<h2>Modal window</h2>
				<button onClick={isClosed} >Закрыть</button>
				<input
					value={value}
					className="input-edit"
					type="text"
					placeholder="Введите текст..."
					onChange={handleNameChange}
				/>

				<button onClick={handleSave} className="save-btn">Сохранить</button>

				<h1>{`Счет: ${count}`}</h1>
				<button onClick={() => setCount((c) => c + 1)}>увеличить</button>
				<button onClick={() => setCount((c) => c - 1)}>уменьшить</button>

			</div>
		</div>

	)
}

