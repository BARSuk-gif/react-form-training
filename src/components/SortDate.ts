import ParseDate from './ParseDate';
import type { TrainingData } from './types';

export default function SortDate(trainings: TrainingData[]): TrainingData[] {
    return [...trainings].sort((a, b) => ParseDate(a.date) - ParseDate(b.date))
}