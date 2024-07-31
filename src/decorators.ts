import type {
  Args,
  DecoratorFunction,
  PartialStoryFn,
  Renderer,
  StoryContext,
} from "@storybook/types";
import type { FeatureFlags, FlagsParameter } from "./types";

type FlagsDecoratorFunction<
  TRenderer extends Renderer = Renderer,
  TArgs = Args,
> = (
  fn: PartialStoryFn<TRenderer, TArgs>,
  flags: FeatureFlags,
  c: StoryContext<TRenderer, TArgs>,
) => TRenderer["storyResult"];

export function getFlagValues(context: StoryContext): FeatureFlags {
  const flagOptions = context.parameters.featureFlags;
  const featureFlags = context.globals.featureFlags;

  return Object.fromEntries(
    Object.entries(flagOptions).map(([key, flag]) => [
      key,
      featureFlags[key] ?? flag.defaultValue,
    ]),
  );
}

export function selectFlags<Flags extends Record<string, any> = FlagsParameter>(
  allFlags: Flags,
  selectedFlags: (keyof Flags)[],
) {
  return Object.fromEntries(
    Object.entries(allFlags).filter(([key]) => selectedFlags.includes(key)),
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
