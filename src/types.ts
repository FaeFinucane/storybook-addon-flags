export type BoolFlag = { type: "boolean"; defaultValue?: boolean };
export type EnumFlag<T extends string = string> = {
  type: "enum";
  options: T[];
  defaultValue?: string;
};
export type Flag = BoolFlag | EnumFlag;

export interface FeatureFlags {
  [key: string]: boolean | string;
}

/**
 * This complex type allows a developer to override the FeatureFlags type to provide a more specific type for each flag,
 * and have FlagsParameter pick up on it.
 *
 * @example
 *   declare module "storybook-addon-flags" {
 *     interface FeatureFlags {
 *       MyFlag: "foo" | "bar";
 *     }
 *   }
 */
export type FlagsParameter = {
  [K in keyof FeatureFlags]: FeatureFlags[K] extends string
    ? EnumFlag<FeatureFlags[K]>
    : FeatureFlags[K] extends boolean
      ? BoolFlag
      : Flag;
};
