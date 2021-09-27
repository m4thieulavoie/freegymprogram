import {
  FASTElement,
  customElement,
  html,
  observable,
  repeat,
} from "@microsoft/fast-element";
import type Exercise from "../models/Exercise";
import ExerciseService from "../services/Exercises.service";
import RouterService from "../services/Router.service";
import styles from "./DailySchedule.scss";

const template = html<DailyScheduleComponent>`<h1>${(x) => x.musclesHeader}</h1>
  ${repeat(
    (x) => x.exercises,
    html`<fgp-exercise exerciseid="${(x) => x.id}"></fgp-exercise>`
  )}`;

@customElement({
  name: "fgp-daily-schedule",
  template,
  styles,
})
export default class DailyScheduleComponent extends FASTElement {
  @observable exercises: Exercise[];
  @observable musclesHeader = "";

  connectedCallback() {
    super.connectedCallback();
    const rawData = RouterService.getRouteParams().muscles as string;

    const splitData = rawData.split("&");

    this.musclesHeader = splitData
      .map((data) => data.split("="))
      .map(([muscle]) => muscle)
      .join(" ");

    const dataToRender = splitData
      .map((data) => data.split("="))
      .map(([muscle, amount]) => ({
        muscle,
        amount: Number(amount),
      }));

    this.exercises = dataToRender
      .map(({ muscle, amount }) =>
        ExerciseService.getExercisesFromMuscle(muscle, amount)
      )
      .flat();
  }
}
