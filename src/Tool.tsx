import React, { memo, useCallback, useEffect, useState } from "react";
import { useGlobals, useStorybookApi } from "@storybook/manager-api";
import { Icons, IconButton } from "@storybook/components";
import { ADDON_ID, PARAM_KEY, TOOL_ID } from "./constants";

export const Tool = memo(function MyAddonSelector() {
  const [globals, updateGlobals] = useGlobals();
  const api = useStorybookApi();
  
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    api.setAddonShortcut(ADDON_ID, {
      label: "Toggle Flags [F]",
      defaultShortcut: ["F"],
      actionName: "outline",
      showInMenu: false,
      action: () => setOpen((isOpen) => !isOpen),
    });
  }, [setOpen, api]);

  return (
    <div>
      <IconButton
        key={TOOL_ID}
        active={isOpen}
        title="Feature Flags"
        onClick={() => setOpen(!isOpen)}
      >
        <Icons icon="lightning" />
      </IconButton>
    </div>
  );
});
