/**
 * Excludes the props following the NEVO pattern. Useful for creating discriminated union types that enable component uses that do not necessitate the NEVO pattern.
 */
export type NeverNevoProps = {
  value?: never;
  name?: never;
  onChange?: never;
  error?: never;
  onChangeError?: never;
};
