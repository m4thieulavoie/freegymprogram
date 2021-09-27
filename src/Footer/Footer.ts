import { FASTElement, customElement, html } from "@microsoft/fast-element";
import styles from "./Footer.scss";

const template = html`<a
  href="https://github.com/m4thieulavoie/freegymprogram"
  target="_blank"
  >View in GitHub</a
> `;

@customElement({
  name: "wcs-footer",
  template,
  styles,
})
export default class FooterComponent extends FASTElement {}
