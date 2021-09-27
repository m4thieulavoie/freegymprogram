export default interface Exercise {
  readonly equipment: ReadonlyArray<string>;
  readonly id: number;
  readonly id_hex: string;
  readonly id_num: string;
  /**
   * @deprecated Not resolving on the remote server anymore
   */
  readonly images: ReadonlyArray<string>;
  readonly img: ReadonlyArray<string>;
  readonly name: string;
  readonly primary: string;
  readonly primer: string;
  readonly secondary?: ReadonlyArray<string>;
  readonly steps: ReadonlyArray<string>;
  readonly title: string;
  readonly type: string;
  readonly url: string;
}
