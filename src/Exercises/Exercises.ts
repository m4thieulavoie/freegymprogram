import {
  FASTElement,
  customElement,
  html,
  repeat,
} from "@microsoft/fast-element";
import type Exercise from "../models/Exercise";
import ExerciseService from "../services/Exercises.service";
import styles from "./Exercises.scss";

const template = html<ExercisesComponent>`${repeat(
  (x) => x.getExercises(),
  html<Exercise>`<fgp-exercise exerciseId=${(x) => x.id}></fgp-exercise>`
)}`;

@customElement({
  name: "fgp-exercises",
  template,
  styles,
})
export default class ExercisesComponent extends FASTElement {
  getExercises() {
    return ExerciseService.getExercises();
  }
}
