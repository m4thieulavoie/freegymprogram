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
  html<ExerciseComponent>`<header>
      <h1>
        <matt-anchor href="/exercise/${(x) => x.exercise.id}"
          >${(x) => x.exercise.title}</matt-anchor
        >
        ${when(
          (x) => x.toggleable,
          html`<input
            type="checkbox"
            @change=${(x) => (x.isVisible = !x.isVisible)}
          />`
        )}
      </h1>
    </header>
    ${when(
      (x) => x.isVisible,
      html`<section>
        <p>${(x) => x.exercise.primer}</p>
        <p><strong>Primary muscle</strong>: ${(x) => x.exercise.primary}</p>
        <p>
          <strong>Secondary muscles</strong>:
          ${repeat((x) => x.exercise.secondary, html`${(x) => x},`)}
        </p>
        ${(x) => x.renderSelectedImage()}

        <h2>Exercise steps</h2>
        <details>
          <summary>Steps</summary>
          <ul>
            ${repeat(
              (x) => x.exercise.steps,
              html`${(x) => html`<li>${x}</li>`}`
            )}
          </ul>
        </details>
      </section>`
    )}`
)}`;

@customElement({
  name: "fgp-exercise",
  template,
  styles,
})
export default class ExerciseComponent extends FASTElement {
  @attr() exerciseid: number;
  @attr({ mode: "boolean" }) toggleable: boolean;
  @observable exercise: Exercise;
  @observable selectedImageId = 0;
  @observable isVisible = true;

  exerciseidChanged(_oldValue: string, newValue: string) {
    this.exercise = ExerciseService.getExerciseFromId(Number(newValue));
  }

  renderSelectedImage() {
    if (!this.exercise.img) {
      return;
    }

    const selectedImg = this.exercise.img[this.selectedImageId];
    if (!selectedImg) {
      return;
    }

    return html` <section>
      <span class="hint">
        ${this.selectedImageId + 1} of ${this.exercise.img.length}</span
      ><img
        @click=${() => this.augmentSelectedImageId()}
        alt="${this.exercise.title}"
        src="${selectedImg.replace("_images/web", "/images-web")}"
      />
    </section>`;
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
    }
  }
}
