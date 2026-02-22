import {
  MD3DarkTheme,
  MD3LightTheme,
  configureFonts,
} from "react-native-paper";

const fontConfig = {
  fontFamily: "Raleway_Regular",
  fonts: {
    displayLarge: { fontFamily: "Raleway_Regular" },
    displayMedium: { fontFamily: "Raleway_Regular" },
    displaySmall: { fontFamily: "Raleway_Regular" },

    headlineLarge: { fontFamily: "Raleway_Regular" },
    headlineMedium: { fontFamily: "Raleway_Regular" },
    headlineSmall: { fontFamily: "Raleway_Regular" },

    titleLarge: { fontFamily: "Raleway_SemiBold" },
    titleMedium: { fontFamily: "Raleway_SemiBold" },
    titleSmall: { fontFamily: "Raleway_Medium" },

    bodyLarge: { fontFamily: "Raleway_Regular" },
    bodyMedium: { fontFamily: "Raleway_Regular" },
    bodySmall: { fontFamily: "Raleway_Regular" },

    labelLarge: { fontFamily: "Raleway_Medium" },
    labelMedium: { fontFamily: "Raleway_Medium" },
    labelSmall: { fontFamily: "Raleway_Medium" },
  }
}

export const lightTheme = {
  ...MD3LightTheme,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...MD3LightTheme.colors,
    primary: "#007AFF",
    secondary: "#66B2FF",
    background: "#F5F5F9",
    tertiary: "#ffffff",
    surface: "#222222",
  }
}

export const darkTheme = {
  ...MD3DarkTheme,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#007AFF",
    secondary: "#66B2FF",
    background: "#222222",
    tertiary: "#3A4049",
    surface: "#eeeeee",
  }
}