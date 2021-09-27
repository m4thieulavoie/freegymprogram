import {
  FASTElement,
  customElement,
  html,
  repeat,
  observable,
} from "@microsoft/fast-element";
import type Exercise from "../models/Exercise";
import ExerciseService from "../services/Exercises.service";
import MuscleService from "../services/Muscle.service";
import styles from "./Exercises.scss";

const template = html<ExercisesComponent>` <label for="muscle-select"
    >Select a muscle</label
  >
  <select id="muscle-select" @change=${(x) => x.handleChange()}>
    ${repeat(
      (x) => x.allMuscles,
      html`<option value="${(x) => x}">${(x) => x}</option>`
    )}
  </select>
  ${repeat(
    (x) => x.exercises,
    html<Exercise>`<fgp-exercise exerciseId=${(x) => x.id}></fgp-exercise>`
  )}`;

@customElement({
  name: "fgp-exercises",
  template,
  styles,
})
export default class ExercisesComponent extends FASTElement {
  @observable allMuscles = MuscleService.getAllMuscles();
  @observable exercises = ExerciseService.getExercisesFromMuscle(
    this.allMuscles[0]
  );

  handleChange() {
    this.exercises = ExerciseService.getExercisesFromMuscle(
      this.shadowRoot.querySelector("select").value
    );
  }
}
