import { FASTElement, customElement, html } from "@microsoft/fast-element";
import styles from "./Header.scss";

const template = html` <a href="/">Home</a><a href="/exercises">Exercises</a> `;

@customElement({
  name: "wcs-header",
  template,
  styles,
})
export default class HeaderComponent extends FASTElement {}
