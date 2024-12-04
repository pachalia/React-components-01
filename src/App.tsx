import { useState } from 'react';
import styles from './app.module.css';

interface IList {
	id: string;
	value: string;
	date_time: string;
}

const App: React.FC = () => {
	const [value, setValue] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [list, setList] = useState<IList[]>([]);

	const isValueValid: boolean = value.length < 3 ? false : true;

	const onInputButtonClick = () => {
		const promptValue: string = prompt('Введите значение') || '';
		if (promptValue.length < 3) {
			setError('Введенное значение должно содержать минимум 3 символа');
			setValue(promptValue);
		} else {
			setValue(promptValue);
			setError('');
		}
	};

	const onAddButtonClick = () => {
		if (!error) {
			const newList: IList = {
				id: Date.now().toString(),
				value,
				date_time: new Date().toLocaleString(),
			};
			const listArray = list;
			listArray.push(newList);
			setList(listArray);
			setError('');
			setValue('');
		}
	};

	return (
		<>
			<div className={styles.app}>
				<h1 className={styles['page-heading']}>Ввод значения</h1>
				<p className={styles['no-margin-text']}>
					Текущее значение <code>value</code>: "
					<output className={styles['current-value']}>{value}</output>"
				</p>
				{error && <div className={styles.error}>{error}</div>}
				<div className={styles['buttons-container']}>
					<button className={styles.button} onClick={onInputButtonClick}>
						Ввести новое
					</button>
					<button
						className={styles.button}
						disabled={!isValueValid}
						onClick={onAddButtonClick}
					>
						Добавить в список
					</button>
				</div>
				<div className={styles.listContainer}>
					<h2 className={styles['list-heading']}>Список:</h2>
					{!list.length && (
						<p className={styles['no-margin-text']}>
							Нет добавленных элементов
						</p>
					)}
					<ul className={styles.list}>
						{list &&
							list.map((val) => (
								<li className={styles['list-item']} key={val.id}>
									{val.value + ' - ' + val.date_time}
								</li>
							))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default App;
