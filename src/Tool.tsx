import React, { memo, useCallback, useState } from "react";
import { useGlobals, useParameter } from "storybook/manager-api";
import {
  IconButton,
  ListItem,
  WithTooltipPure,
  TooltipLinkList,
} from "storybook/internal/components";
import { CheckIcon, ChevronRightIcon } from "@storybook/icons";
import {
  FLAG_DEFAULTS_PARAM_KEY,
  FLAG_TYPES_PARAM_KEY,
  FLAG_VALUES_GLOBAL_KEY,
  TOOL_ID,
} from "./constants";
import { styled } from "storybook/theming";
import {
  FeatureFlags,
  type BoolFlagDefinition,
  type EnumFlagDefinition,
  type FlagTypesParameter,
} from "./types";
import { FlagIcon } from "./FlagIcon";

export const Tool = memo(function FlagSelector() {
  const definitions = useParameter<FlagTypesParameter>(
    FLAG_TYPES_PARAM_KEY,
    {},
  );
  const defaults = useParameter<Partial<FeatureFlags>>(
    FLAG_DEFAULTS_PARAM_KEY,
    {},
  );

  const [{ [FLAG_VALUES_GLOBAL_KEY]: overrides }, updateGlobals] = useGlobals();
  const [isOpen, setOpen] = useState(false);

  // const api = useStorybookApi();
  // useEffect(() => {
  //   api.setAddonShortcut(ADDON_ID, {
  //     label: "Toggle Flags [F]",
  //     defaultShortcut: ["F"],
  //     actionName: "outline",
  //     showInMenu: false,
  //     action: () => setOpen((isOpen) => !isOpen),
  //   });
  // }, [setOpen, api]);

  const list = useCallback(
    ({ onHide }: { onHide(): void }) => {
      // Order the flags by whether a default is provided, then by name.
      // This way, flags with defaults will be at the top.
      const sorted = Object.keys(definitions).sort((a, b) => {
        const aHasDefault = a in defaults;
        const bHasDefault = b in defaults;
        if (aHasDefault !== bHasDefault) {
          return aHasDefault ? -1 : 1;
        }
        return a.localeCompare(b);
      });

      return (
        <List>
          {sorted.map((flag) => {
            const definition = definitions[flag];

            const FlagListItem =
              definition.type === "boolean"
                ? BoolFlagListItem
                : EnumFlagListItem;

            const originalValue = defaults?.[flag] ?? definition.initialValue;
            const value = overrides?.[flag] ?? originalValue;

            return (
              <FlagListItem
                key={flag}
                name={flag}
                // @ts-ignore
                definition={definition}
                value={value as any}
                onUpdate={(value) => {
                  updateGlobals({
                    [FLAG_VALUES_GLOBAL_KEY]: {
                      ...overrides,
                      [flag]:
                        value !== originalValue?.toString() ? value : undefined,
                    },
                  });
                  onHide();
                }}
              />
            );
          })}
        </List>
      );
    },
    [definitions, defaults, overrides, updateGlobals],
  );

  return (
    <WithTooltipPure
      placement="top"
      tooltip={list}
      visible={isOpen}
      onVisibleChange={setOpen}
    >
      <IconButton key={TOOL_ID} active={isOpen} title="Feature Flags">
        <FlagIcon />
      </IconButton>
    </WithTooltipPure>
  );
});

type BoolFlagItemProps = {
  name: string;
  definition: BoolFlagDefinition;
  value?: string | boolean;
  onUpdate: (value: string) => void;
};
const BoolFlagListItem = memo(
  ({ name, value, onUpdate }: BoolFlagItemProps) => {
    const actualValue = value === "true" || value === true;
    return (
      <ListItem
        id={name}
        title={name}
        onClick={() => {
          const nextValue = !actualValue;
          onUpdate(nextValue.toString());
        }}
        right={actualValue ? <CheckIcon fill="black" /> : null}
      />
    );
  },
);

type EnumFlagItemProps = {
  name: string;
  definition: EnumFlagDefinition;
  value?: string;
  onUpdate: (value: string) => void;
};
const EnumFlagListItem = memo(
  ({ name, definition: flag, value, onUpdate }: EnumFlagItemProps) => {
    return (
      <WithTooltipPure
        placement="right-start"
        tooltip={({ onHide: onHideNested }) => (
          <TooltipLinkList
            links={flag.options.map((option) => ({
              id: option,
              title: option,
              onClick: () => {
                onHideNested();
                onUpdate(option);
              },
              right: value === option ? <CheckIcon fill="black" /> : null,
            }))}
          />
        )}
        closeOnOutsideClick
        onVisibleChange={() => {}}
        style={{ display: "block" }}
      >
        <ListItem
          id={name}
          title={name}
          right={
            <>
              <ValueLabel>{value}</ValueLabel>
              <ChevronRightIcon fill="black" />
            </>
          }
        />
      </WithTooltipPure>
    );
  },
);

const List = styled.div(
  {
    minWidth: 180,
    overflow: "hidden",
    overflowY: "auto",
    maxHeight: 15.5 * 32, // 11.5 items
  },
  ({ theme }) => ({ borderRadius: theme.appBorderRadius }),
);

const ValueLabel = styled.span({ paddingRight: 4 });
