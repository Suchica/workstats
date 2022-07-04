import React, { createContext, useContext, useState } from 'react';
import timestampButtonList from '../constants/timestampButtonList.json';

// type of the GlobalContextObject
export type GlobalContextObjectType = {
  currentTimeframe?: {
    timeframe: {
      label: string;
    };
    setTimeFrame({}): void; // func dispatchSetState
  };
};

// create the context
const GlobalContext = createContext({});

// Hook to provide access to context object
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

type GlobalContextProps = {
  children?: React.ReactNode | React.ReactNode[];
};

// define initial states
const initialStates = {
  timestamp: {
    label: timestampButtonList[0].label
  }
};

// Context Provider
export const GlobalContextProvider = ({ children }: GlobalContextProps) => {
  // Timestamp State
  const [timeframe, setTimeFrame] = useState(initialStates.timestamp);

  // Assign React state and constants to context object
  const GlobalContextObject: GlobalContextObjectType = {
    currentTimeframe: {
      timeframe,
      setTimeFrame
    }
  };

  return (
    <GlobalContext.Provider value={GlobalContextObject}>
      {children}
    </GlobalContext.Provider>
  );
};
