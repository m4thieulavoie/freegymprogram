import { FASTElement, customElement, html } from "@microsoft/fast-element";
import styles from "./Footer.scss";

const template = html`<matt-anchor
  href="https://github.com/m4thieulavoie/freegymprogram"
  target="_blank"
  >View in GitHub</matt-anchor
> `;

@customElement({
  name: "wcs-footer",
  template,
  styles,
})
export default class FooterComponent extends FASTElement {}
