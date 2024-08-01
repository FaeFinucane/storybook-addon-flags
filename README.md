# Storybook Addon Feature Flags
Allows setting and reading of feature flags in storybook components

## Installation

First, install the package.

```sh
npm install --save-dev storybook-addon-flags
```

Then, register it as an addon in `.storybook/main`.

```js
// .storybook/main.ts

// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  // ...rest of config
  addons: [
    '@storybook/addon-essentials'
    'storybook-addon-flags', // 👈 register the addon here
  ],
};

export default config;
```

## Usage

The primary way to use this addon is to define the `flagTypes` parameter and an appropriate
`withFlags` decorator. We recommend you do this in your `preview.js` file.

```jsx
// preview.ts

// Replace your-framework with the name of your framework
import type { Preview } from '@storybook/your-framework';
import { withFlags } from 'storybook-addon-flags';

const preview: Preview = {
  // ... rest of preview
  parameters: {
    flagTypes: {
      // Define your feature flags here
      foo: {
        type: 'boolean',
        initialValue: false, // Optional
      },
      bar: {
        type: 'enum',
        options: ['a', 'b', 'c'],
        initialValue: 'a', // Optional
      }
    },
  },
  decorators: [
    // ...other decorators
    // React specific example - pass the storybook flags to a react context provider
    // `flags` is an object in the form `{ foo: boolean, bar: 'a' | 'b' | 'c' }`
    withFlags((Story, flags) => {
      return (
        <FeatureFlagProvider flags={flags}>
          <Story>
        </FeatureFlagProvider>
      )
    })
  ]

};

export default preview;
```

It is up to you to ensure that the flags are passed to your components using whatever feature flag library you prefer. Flags may then be modified at run-time via the toolbar.

### Setting flags in stories

If you would like to override the initial flag values for a specific story, you can do so by passing a `flags` parameter to the story.

```jsx
// button.stories.ts

// Replace your-framework with the name of your framework
import type { Preview, Meta, StoryObj } from '@storybook/your-framework';
import Button from './Button.tsx';

// ...

const ButtonWithFoo: StoryObj<typeof Button> = {
  // ...rest of story
  parameters: {
    flags: { foo: true },
  },
}

```

Flags defined in the `flags` parameter are displayed above other flags in the toolbar, for easier access.

### Type Safety

If you would like additional type safety in your storybook flags, you may also override
the FeatureFlags type in your project.

```ts
// types.d.ts

declare module '@storybook/addon-flags' {
  export interface FeatureFlags {
    foo: boolean;
    bar: 'a' | 'b' | 'c';
  }
}

```

## API

### Parameters

This addon contributes the following parameters to Storybook, under the `` namespace:

#### `flagTypes`

Type: `Record<string, BoolFlag | EnumFlag>`

Defines the types of the feature flags that can be set. Each flag is defined by a key, and an object
with the following properties:

- `type`: The type of the flag. One of `boolean` or `enum`.
- `options`: If the type is `enum`, an array of possible values.
- `initialValue`: The initial value of the flag. Optional.

```ts
{
  flagTypes: {
    foo: {
      type: 'boolean',
      initialValue: false,
    },
    bar: {
      type: 'enum',
      options: ['a', 'b', 'c'],
      initialValue: 'a',
    }
  }
}
```

#### `flags`

Type: `Record<string, any>`

Overrides the initial value of the feature flags for a specific story.

```tsx
{
  flags: {
    foo: true,
    bar: 'b',
  }
}
```

### Decorators

#### `withFlags`

Type: `(Story: StoryType, flags: FeatureFlags, context: Context) => StoryType`

A decorator that wraps a story and passes the current flags to it. The `flags` parameter is an
object in the form `{ [flagName]: flagValue }`.

```tsx
const flagDecorator = withFlags((Story, flags) => (
  <FlagsProvider flags={flags}>
    <Story />
  </FlagsProvider>
))
```
