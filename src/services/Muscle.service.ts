import type Muscle from "../models/Muscle";
import ExerciseService from "./Exercises.service";

export default class MuscleService {
  static getAllMuscles(): Muscle[] {
    const unflattenedList = ExerciseService.getExercises().map((exercise) => [
      ...(exercise.primary ?? "").split(",").map((muscle) => muscle.trim()),
      ...(exercise.secondary ?? []),
    ]);

    const flattenedList = unflattenedList.flat().filter((muscle) => !!muscle);

    return [...new Set(flattenedList)];
  }
}
