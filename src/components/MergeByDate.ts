import type { TrainingData } from "./types";

export default function MergeByDate(
  trainings: TrainingData[],
  item: TrainingData
): TrainingData[] {
	const existing = trainings.find((t) => t.date === item.date);
	if (!existing) {
		// новой даты нет — добавляем
		return [...trainings, item];
	}
	return trainings.map((t) => 
		t.date === item.date
		 ? {...t, distance: t.distance + item.distance}
		 : t
	);
}