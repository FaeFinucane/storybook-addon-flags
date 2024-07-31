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
import { PARAM_KEY } from "./constants";
import type { FlagsParameter, FeatureFlags } from "./types";

const preview: ProjectAnnotations<Renderer> = {
  parameters: {
    [PARAM_KEY]: undefined as FlagsParameter | undefined,
  },
  globals: {
    [PARAM_KEY]: {} as FeatureFlags,
  },
};

export default preview;
