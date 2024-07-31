import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { withFlags } from "../index";
import { Button } from "./Button";
import FlagsProvider from "./FlagsProvider";

// Note: Could specify type for this flag with
// declare module "../types" {
//   interface FeatureFlags {
//     ButtonStyle: "primary" | "secondary";
//   }
// }

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
    // Get the current feature flags using the decorator
    withFlags((Story, flags) => (
      <FlagsProvider flags={flags}>
        <Story />
      </FlagsProvider>
    )),
  ],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    label: "Primary",
  },
};
