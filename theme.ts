import { extendTheme } from "native-base";

export const THEME = extendTheme({
  colors: {
    gray: {
      950: "#09090A",
      900: "#121214",
      800: "#202024",
      600: "#323238",
      300: "#8D8D99",
      200: "#C4C4CC",
    },
    green: { 500: "#047C3F" },
    yellow: { 500: "#f7DD43", 600: "#BBA317" },
    red: { 500: "#DB4437" },
    white: "#ffffff",
  },
  config: {
    // ✅ evita usar focusVisible (web) em runtime nativo
    useSystemColorMode: false,
  },

  fonts: {
    heading: "Roboto_700Bold",
    body: "Roboto_400Regular",
    medium: "Roboto_500Medium",
  },

  fontSizes: { xs: 12, sm: 14, md: 16, lg: 20, xl: 24 },

  sizes: { 14: 56 },

  
  components: {
    Input: {
      baseStyle: {
        style: {
        outlineWidth: 0 as any,
        },
       _focusVisible: {
            _web: {
                outlineWidth: 0,
            },
            },
        _focus: {
          outlineWidth: 0, 
        },
      },
    },
    TextArea: {
            baseStyle: {
            _focusVisible: {
        _web: {
            outlineWidth: 0,
        },
        },
        _focus: { outlineWidth: 0 },
      },
    },
    Select: {
      baseStyle: {
        _focusVisible: {
        _web: {
            outlineWidth: 0,
        },
        },
        _focus: { outlineWidth: 0 },
      },
    },
    Button: {
      baseStyle: {
            _focusVisible: {
        _web: {
            outlineWidth: 0,
        },
        },
        _focus: { outlineWidth: 0 },
      },
    },
  },
});