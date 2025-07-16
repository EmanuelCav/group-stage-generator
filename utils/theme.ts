import { MD3LightTheme as DefaultTheme } from "react-native-paper";
import { MD3DarkTheme as DarkTheme, MD3LightTheme as LightTheme } from "react-native-paper";

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#007AFF",
    secondary: "#66B2FF",
    // background: "",
  },
}


export const lightTheme = {
  ...LightTheme,
  colors: {
    ...LightTheme.colors,
    primary: "#007AFF",
    secondary: "#66B2FF",
    background: "#F5F5F9",
    tertiary: "#ffffff",
    surface: "#222222"
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#007AFF",
    secondary: "#66B2FF",
    background: "#222222",
    tertiary: "#3A4049",
    surface: "#eeeeee"
  },
};
