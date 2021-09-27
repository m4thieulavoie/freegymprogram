import exercises from "../../exercises.json";
import type Exercise from "../models/Exercise";

export default class ExerciseService {
  static getExercises(): Exercise[] {
    return exercises as Exercise[];
  }

  static getExerciseFromId(exerciseId: number) {
    return this.getExercises().find(({ id }) => id === exerciseId);
  }

  static getExercisesFromMuscle(muscle: string, amount?: number) {
    let exercisesForMuscle = this.getExercises().filter(
      (exercise) => exercise.primary === muscle
    );

    if (!exercisesForMuscle.length) {
      exercisesForMuscle = this.getExercises().filter(
        (exercise) =>
          exercise.primary === muscle || exercise.secondary?.includes(muscle)
      );
    }

    const shuffled = exercisesForMuscle.sort(() => 0.5 - Math.random());

    return amount ? shuffled.slice(0, amount) : shuffled;
  }
}
