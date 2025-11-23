import { useState } from "react";
import { Task } from "../types";

interface ModalProps {
	isClosed: () => void;
	update: (value: string) => void;
	modal: Task;
}

export const Modal = ({ isClosed, update, modal }: ModalProps) => {

	const [value, setValue] = useState(modal.value)

	const handleSave = () => {
		update(value);
		isClosed();
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
					onChange={(e) => setValue(e.target.value)}
				/>
				<button onClick={handleSave} className="save-btn">Сохранить</button>
			</div>
		</div>

	)
}

