import type { PARAM_KEY } from "./constants";
import type { FlagsParameter, FlagsGlobal, FeatureFlags } from "./types";

declare module "@storybook/types" {
  interface Parameters {
    [PARAM_KEY]?: FlagsParameter;
  }

  interface Globals {
    [PARAM_KEY]: FeatureFlags;
  }
}
