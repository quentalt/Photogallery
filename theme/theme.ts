import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
    config: {
        initialColorMode: "light" || "dark",
        useSystemColorMode: false,
 //dark mode
        styles: {
            global: {
                body: {
                    bg: "gray.50",
                    color: "gray.800",
                }
            }
        }
    },
    colors: {
        gray: {
            "50": "#F5F8FA",
            "100": "#DADADA",
        },
        },
    components: {
        Tabs: {
            variants: {
                'with-border': {
                    tablist: {
                        borderColor: "gray.200",
                        mb: "1em",
                        pl: 0,
                        listStyle: "none",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                    },
                    tab: {
                        _selected: {
                            color: "green.500",
                            borderBottom: "2px solid",
                            borderColor: "green.500",
                            fontWeight: "semibold",
                        },
                        _focus: {
                            color: "green.500",
                        }
                    }
                }
            }
        }
    }
})

export default theme