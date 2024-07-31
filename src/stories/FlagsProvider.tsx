import React, { createContext, useContext } from "react";

/**
 * This is an example flags provider that could be used to pass feature flags to your application.
 * It uses React's context API to provide the flags to any component that needs them.
 */

export type Flags = Record<string, boolean | string>;

const FlagsContext = createContext<Flags>({});

export default function FlagsProvider({
  flags,
  children,
}: {
  flags: Flags;
  children: React.ReactNode;
}) {
  return (
    <FlagsContext.Provider value={flags}>{children}</FlagsContext.Provider>
  );
}

export const useFlags = () => {
  return useContext(FlagsContext);
};
