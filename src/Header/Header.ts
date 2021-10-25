import { FASTElement, customElement, html } from "@microsoft/fast-element";
import styles from "./Header.scss";

const template = html`
  <matt-anchor href="/">Home</matt-anchor
  ><matt-anchor href="/exercises">Exercises</matt-anchor>
`;

@customElement({
  name: "wcs-header",
  template,
  styles,
})
export default class HeaderComponent extends FASTElement {}
