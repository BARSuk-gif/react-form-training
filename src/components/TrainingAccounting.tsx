import React, { useState } from "react";
import SortDate from "./SortDate";
import MergeByDate from "./MergeByDate";
import type { TrainingData } from "./types";

export default function TrainingAccounting() {
	const [formData, setFormData] = useState<TrainingData>({
		date: '',
		distance: 0,
	});
	const [trainings, setTrainings] = useState<TrainingData[]>([]);
	const [editDate, setEditDate] = useState<string | null>(null);

	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => 
		setFormData((prev) => ({ ...prev, date: e.target.value }));

	const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
		const value = e.target.value;
		setFormData((prev) => ({
			...prev,
			distance: value === '' ? 0 : Number(value),
		}));
	}	
	
	const handleEdit = (date: string) => {
		const item = trainings.find(t => t.date === date);
		if (!item) return;
		setFormData({ date: item.date, distance: item.distance});
		setEditDate(date);
	}

	const handleDelete = (date: string) => {
		const newTreinings = trainings.filter(t => t.date !== date);
		setTrainings(newTreinings);
		setFormData({ date: '', distance: 0});
	}

	const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		
		const newDate = formData.date;
		const newDistance = formData.distance;

		setTrainings((prev) => {
			if (editDate !== null) {
				// РЕДАКТИРОВАНИЕ — замена, без сложения
				return SortDate(
					prev.map((t) => 
						t.date === editDate ? {date: newDate, distance: newDistance} : t)
				);
			}

			// ДОБАВЛЕНИЕ — слияние со сложением
			return SortDate(
				MergeByDate(prev, { date: newDate, distance: newDistance })
			);
		});

		setFormData({ date: '', distance: 0 });
		setEditDate(null);
	}

	return (
		<>
			<div className="form-container">
				<form id="trainingForm" onSubmit={handleSubmit}>
					<div className="form-row">
						<div className="form-group">
							<label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
							<input type="text"
								value={formData.date}
								onChange={handleDateChange}
								id="date"
								name="date"
								placeholder="20.07.2019" required 
							/>
						</div>

						<div className="form-group">
							<label htmlFor="distance">Пройдено км</label>
							<input type="number"
								value={formData.distance || ''}
								onChange={handleDistanceChange}
								id="distance"
								name="distance"
								placeholder="5.7"
								step="0.1"
								min="0"
								required
							/>
						</div>

						<button type="submit" className="submit-btn">Ok</button>
					</div>
				</form>
			</div>

			<div className="data-table">
				<div className="table-header">
					<div className="col-date">Дата (ДД.ММ.ГГ)</div>
					<div className="col-distance">Пройдено км</div>
					<div className="col-actions">Действия</div>
				</div>
				
				<div className="table-body" id="tableBody" >
					{trainings.length === 0 ? (
						<div className="empty-state">Нет данных</div>
					) : (
						trainings.map((training) => (	
							<div className='table-row' key={training.date}>
								<div className="col-date">{ training.date }</div>
								<div className="col-distance">{ training.distance }</div>
								<div className="col-actions">
									<button type="button" 
										className="action-btn edit-btn" 
										title="Редактировать"
										// value={editDate}
										onClick={() => handleEdit(training.date)}
									>✎</button>
									<button type="button" 
										className="action-btn delete-btn" 
										title="Удалить"
										onClick={() => handleDelete(training.date)}
									>✕</button>
								</div>
							</div>
						))
					)}
				</div>									
			</div>
		</>
	)
}