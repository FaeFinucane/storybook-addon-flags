import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useGlobals } from "@storybook/manager-api";
import { Button } from "./Button";
import FlagsProvider from "./FlagsProvider";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Button> = {
  title: "Example/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    // Specify the feature flags this component responds to
    featureFlags: {
      ButtonStyle: {
        type: "enum",
        options: ["primary", "secondary"],
      },
    },
  },
  decorators: [
    (Story, context) => {
      // Get the active feature flags from storybook's globals
      const featureFlags = context.globals.featureFlags;
      return (
        <FlagsProvider flags={featureFlags}>
          <Story />
        </FlagsProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    label: "Primary",
  },
};
