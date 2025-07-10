import type { Preview } from "@storybook/react-vite";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "light",
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
  },
};

export default preview;
