import {
  FASTElement,
  customElement,
  html,
  repeat,
  observable,
} from "@microsoft/fast-element";
import MuscleService from "../services/Muscle.service";
import styles from "./Home.scss";

const template = html<HomeComponent>`<h1>Let's get this done!</h1>
  <label for="schedule-select"
    >Pick the muscles you want to work out today</label
  >
  <select id="schedule-select" @change=${(x) => x.handleChange()} multiple>
    ${repeat(
      (x) => x.allMuscles,
      html`<option value="${(x) => x}">${(x) => x}</option>`
    )}
  </select>
  <matt-button
    @click=${(x) => x.generateProgram()}
    variant="secondary"
    size="small"
    >Go</matt-button
  >
  <h1>Presets</h1>
  <a href="/dailyschedule/chest=3&triceps=3">Chest triceps</a>
  <a href="/dailyschedule/back=3&biceps=3">Back biceps</a>
  <a href="/dailyschedule/legs=5">Leg day</a>`;

@customElement({
  name: "wcs-home",
  template,
  styles,
})
export default class HomeComponent extends FASTElement {
  @observable allMuscles = MuscleService.getAllMuscles();

  private getSelectedOptions() {
    return Array.from(
      this.shadowRoot.querySelector("select").selectedOptions
    ).map((x) => x.value);
  }

  connectedCallback() {
    super.connectedCallback();
  }

  handleChange() {
    console.warn({ select: this.getSelectedOptions() });
  }

  generateProgram() {
    const builtUrl = this.getSelectedOptions()
      .map((x) => `${x}=3&`)
      .join("");
    window.location.href = `/dailyschedule/${builtUrl.substring(
      0,
      builtUrl.length - 1
    )}`;
  }
}
