import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
    components: {
        Tabs: {
            variants: {
                'with-border': {
                    tablist: {
                        borderBottom: "1px solid",
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
                        }
                    }
                }
            }
        }
    }
})

export default theme