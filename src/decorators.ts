import type {
  Args,
  DecoratorFunction,
  PartialStoryFn,
  Renderer,
  StoryContext,
} from "@storybook/types";
import type { FeatureFlags, FlagTypesParameter } from "./types";
import {
  FLAG_DEFAULTS_PARAM_KEY,
  FLAG_TYPES_PARAM_KEY,
  FLAG_VALUES_GLOBAL_KEY,
} from "./constants";

type FlagsDecoratorFunction<
  TRenderer extends Renderer = Renderer,
  TArgs = Args,
> = (
  fn: PartialStoryFn<TRenderer, TArgs>,
  flags: FeatureFlags,
  c: StoryContext<TRenderer, TArgs>,
) => TRenderer["storyResult"];

export function getFlagValues(context: StoryContext): FeatureFlags {
  const definitions = context.parameters[FLAG_TYPES_PARAM_KEY];
  const defaults = context.parameters[FLAG_DEFAULTS_PARAM_KEY];
  const overrides = context.globals[FLAG_VALUES_GLOBAL_KEY];

  return Object.fromEntries(
    Object.keys(definitions).map((flag) => [
      flag,
      overrides?.[flag] ?? defaults?.[flag] ?? definitions[flag].initialValue,
    ]),
  );
}

export function withFlags<TRenderer extends Renderer = Renderer, TArgs = Args>(
  decorator: FlagsDecoratorFunction<TRenderer, TArgs>,
): DecoratorFunction<TRenderer, TArgs> {
  return (story, context) => {
    const allFlags = getFlagValues(context);

    return decorator(story, allFlags, context);
  };
}
