import type {
  FLAG_DEFAULTS_PARAM_KEY,
  FLAG_TYPES_PARAM_KEY,
  FLAG_VALUES_GLOBAL_KEY,
} from "./constants";
import type { FlagTypesParameter, FeatureFlags } from "./types";

declare module "@storybook/types" {
  interface Parameters {
    [FLAG_TYPES_PARAM_KEY]?: FlagTypesParameter;
    [FLAG_DEFAULTS_PARAM_KEY]?: Partial<FeatureFlags>;
  }

  interface Globals {
    [FLAG_VALUES_GLOBAL_KEY]: Partial<FeatureFlags>;
  }
}

declare module "@storybook/csf" {
  interface Parameters {
    [FLAG_TYPES_PARAM_KEY]?: FlagTypesParameter;
    [FLAG_DEFAULTS_PARAM_KEY]?: Partial<FeatureFlags>;
  }
}
