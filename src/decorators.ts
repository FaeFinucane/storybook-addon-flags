import type {
  Args,
  DecoratorFunction,
  PartialStoryFn,
  Renderer,
  StoryContext,
} from "@storybook/types";
import type { FeatureFlags } from "./types";

type FlagsDecoratorFunction<
  TRenderer extends Renderer = Renderer,
  TArgs = Args,
> = (
  fn: PartialStoryFn<TRenderer, TArgs>,
  flags: FeatureFlags,
  c: StoryContext<TRenderer, TArgs>,
) => TRenderer["storyResult"];

export function getFlags(context: StoryContext): FeatureFlags {
  const flagOptions = context.parameters.featureFlags;
  const featureFlags = context.globals.featureFlags;

  return Object.fromEntries(
    Object.entries(flagOptions).map(([key, flag]) => [
      key,
      featureFlags[key] ?? flag.defaultValue,
    ]),
  );
}

export function withFlags<TRenderer extends Renderer = Renderer, TArgs = Args>(
  decorator: FlagsDecoratorFunction<TRenderer, TArgs>,
): DecoratorFunction<TRenderer, TArgs> {
  return (story, context) => {
    const allFlags = getFlags(context);

    return decorator(story, allFlags, context);
  };
}
