import React, { memo, useCallback, useState } from "react";
import {
  useGlobals,
  useParameter,
  useStorybookApi,
} from "@storybook/manager-api";
import {
  IconButton,
  ListItem,
  WithTooltipPure,
  TooltipLinkList,
} from "@storybook/components";
import { LightningIcon, CheckIcon, ChevronRightIcon } from "@storybook/icons";
import { PARAM_KEY, TOOL_ID } from "./constants";
import { styled } from "@storybook/theming";
import type { BoolFlag, EnumFlag, FlagsParameter } from "./types";

export const Tool = memo(function FlagSelector() {
  const flagOptions = useParameter<FlagsParameter>(PARAM_KEY, {});

  const [{ [PARAM_KEY]: flagValues }, updateGlobals] = useGlobals();
  const api = useStorybookApi();

  const [isOpen, setOpen] = useState(false);

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
    ({ onHide }: { onHide(): void }) => (
      <List>
        {Object.entries(flagOptions).map(([name, flag]) => {
          const FlagListItem =
            flag.type === "boolean" ? BoolFlagListItem : EnumFlagListItem;
          return (
            <FlagListItem
              key={name}
              name={name}
              // @ts-ignore
              flag={flag}
              value={flagValues?.[name]}
              onUpdate={(value) => {
                updateGlobals({
                  [PARAM_KEY]: { ...flagValues, [name]: value },
                });
                onHide();
              }}
            />
          );
        })}
      </List>
    ),
    [flagOptions, flagValues, updateGlobals],
  );

  return (
    <WithTooltipPure
      placement="top"
      tooltip={list}
      visible={isOpen}
      onVisibleChange={setOpen}
    >
      <IconButton key={TOOL_ID} active={isOpen} title="Feature Flags">
        <LightningIcon />
      </IconButton>
    </WithTooltipPure>
  );
});

type BoolFlagItemProps = {
  name: string;
  flag: BoolFlag;
  value?: string;
  onUpdate: (value: string) => void;
};
const BoolFlagListItem = memo(
  ({ name, flag, value, onUpdate }: BoolFlagItemProps) => {
    const actualValue =
      value !== undefined ? value === "true" : flag.defaultValue;
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
  flag: EnumFlag;
  value?: string;
  onUpdate: (value: string) => void;
};
const EnumFlagListItem = memo(
  ({ name, flag, value, onUpdate }: EnumFlagItemProps) => {
    const actualValue = value ?? flag.defaultValue;
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
              right: actualValue === option ? <CheckIcon fill="black" /> : null,
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
              <ValueLabel>{actualValue}</ValueLabel>
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
  ({ theme }) => ({
    borderRadius: theme.appBorderRadius,
  }),
);

const ValueLabel = styled.span({
  paddingRight: 4,
});
