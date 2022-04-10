import React, { useContext, useState } from "react";

// Create our theme context using React.CreateContext()
export const UserContext = React.createContext();

// Create a custom hook that allows easy access to our ThemeContext values
export const useUser = () => useContext(UserContext);

export default function UserProvider(args) {
  const [userData, setUserData] = useState(undefined);
  return <useUser.Provider value={{ userData, setUserData }} {...args} />;
}
