import {
  FASTElement,
  customElement,
  html,
  attr,
  observable,
  when,
  repeat,
} from "@microsoft/fast-element";
import type Exercise from "../models/Exercise";
import ExerciseService from "../services/Exercises.service";
import RouterService from "../services/Router.service";
import styles from "./Exercise.scss";

const template = html<ExerciseComponent>`${when(
  (x) => x.exercise,
  html<ExerciseComponent>`<h1>
      <a href="/exercise/${(x) => x.exercise.id}">${(x) => x.exercise.title}</a>
    </h1>
    <p>${(x) => x.exercise.primer}</p>
    <p><strong>Primary muscle</strong>: ${(x) => x.exercise.primary}</p>
    <p>
      <strong>Secondary muscles</strong>:
      ${repeat((x) => x.exercise.secondary, html`${(x) => x}`)}
    </p>
    ${(x) => x.renderSelectedImage()}
    <details>
      <summary>Steps</summary>
      <ul>
        ${repeat((x) => x.exercise.steps, html`${(x) => html`<li>${x}</li>`}`)}
      </ul>
    </details> `
)}`;

@customElement({
  name: "fgp-exercise",
  template,
  styles,
})
export default class ExerciseComponent extends FASTElement {
  @attr() exerciseid: number;
  @observable exercise: Exercise;
  @observable selectedImageId = 0;

  exerciseidChanged(_oldValue: string, newValue: string) {
    this.exercise = ExerciseService.getExerciseFromId(Number(newValue));
  }

  renderSelectedImage() {
    if (!this.exercise.img) {
      return;
    }

    const selectedImg = this.exercise.img[this.selectedImageId];
    return html`<span
        >${this.selectedImageId + 1} of ${this.exercise.img.length}</span
      ><img
        @click=${() => this.augmentSelectedImageId()}
        src="${selectedImg.replace("_images/web", "/images-web")}"
      />`;
  }

  augmentSelectedImageId() {
    const maxPossibleValue = this.exercise.img.length - 1;
    this.selectedImageId++;

    if (this.selectedImageId > maxPossibleValue) {
      this.selectedImageId = 0;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    const { id = undefined } = RouterService.getRouteParams();
    if (id) {
      this.exercise = ExerciseService.getExerciseFromId(Number(id));
      console.warn(this.exercise);
    }
  }
}
