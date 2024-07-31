import type { PARAM_KEY } from "./constants";
import type { FlagsParameter, FlagsValues } from "./preview";

declare module "@storybook/types" {
  interface Parameters {
    [PARAM_KEY]?: FlagsParameter;
  }

  interface Globals {
    [PARAM_KEY]: FlagsValues;
  }
}
