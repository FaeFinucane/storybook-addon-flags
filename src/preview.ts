/**
 * A decorator is a way to wrap a story in extra “rendering” functionality. Many addons define decorators
 * in order to augment stories:
 * - with extra rendering
 * - gather details about how a story is rendered
 *
 * When writing stories, decorators are typically used to wrap stories with extra markup or context mocking.
 *
 * https://storybook.js.org/docs/react/writing-stories/decorators
 */
import type { Renderer, ProjectAnnotations } from "@storybook/types";
import { FLAG_TYPES_PARAM_KEY, FLAG_VALUES_GLOBAL_KEY } from "./constants";
import type { FlagTypesParameter, FeatureFlags } from "./types";

const preview: ProjectAnnotations<Renderer> = {
  parameters: {
    [FLAG_TYPES_PARAM_KEY]: undefined as FlagTypesParameter | undefined,
  },
  initialGlobals: {
    [FLAG_VALUES_GLOBAL_KEY]: {} as FeatureFlags,
  },
};

export default preview;
