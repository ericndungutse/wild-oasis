import { createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  // const [value, setValue] = useState(function () {
  //   const storedValue = localStorage.getItem(key);
  //   return storedValue ? JSON.parse(storedValue) : initialState;
  // });

  // // Change Value in local storage when value changes
  // // Similar to use an event handler
  // Change this componet's state and synchronizes it with local storage
  // useEffect(
  //   function () {
  //     localStorage.setItem(key, JSON.stringify(value));
  //   },
  //   [value, key]
  // );
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    false,
    'isDarkMode'
  );

  useEffect(() => {
    document.documentElement.className = `${
      isDarkMode ? 'dark-mode' : 'light-mode'
    }`;
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((mode) => !mode);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context)
    throw new Error(
      'Dark mode context was used outside dark mode provider'
    );

  return context;
};

export { useDarkMode, DarkModeProvider };
