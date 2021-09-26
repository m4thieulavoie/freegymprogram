import exercises from "../../exercises.json";
import type Exercise from "../models/Exercise";

export default class ExerciseService {
  static getExercises(): Exercise[] {
    return exercises as Exercise[];
  }

  static getExerciseFromId(exerciseId: number) {
    return this.getExercises().find(({ id }) => id === exerciseId);
  }
}
