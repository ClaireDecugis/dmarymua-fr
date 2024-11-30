import React, { createContext, useState } from "react";

export const AvailabilityContext = createContext();

export const AvailabilityProvider = ({ children }) => {
  const [availabilities, setAvailabilities] = useState([]);

  const updateAvailabilities = (newAvailabilities) => {
    setAvailabilities(newAvailabilities);
  };

  return (
    <AvailabilityContext.Provider
      value={{ availabilities, updateAvailabilities }}
    >
      {children}
    </AvailabilityContext.Provider>
  );
};
