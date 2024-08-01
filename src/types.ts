export type BoolFlagDefinition = { type: "boolean"; initialValue?: boolean };
export type EnumFlagDefinition<T extends string = string> = {
  type: "enum";
  options: readonly T[];
  initialValue?: string;
};
export type FlagDefinition = BoolFlagDefinition | EnumFlagDefinition;

export interface FeatureFlags {
  [key: string]: boolean | string;
}

/**
 * This complex type allows a developer to override the FeatureFlags type to provide a more specific type for each flag,
 * and have FlagTypesParameter pick up on it.
 *
 * @example
 *   declare module "storybook-addon-flags" {
 *     interface FeatureFlags {
 *       MyFlag: "foo" | "bar";
 *     }
 *   }
 */
export type FlagTypesParameter = {
  [K in keyof FeatureFlags]: FeatureFlags[K] extends string
    ? EnumFlagDefinition<FeatureFlags[K]>
    : FeatureFlags[K] extends boolean
      ? BoolFlagDefinition
      : FlagDefinition;
};
