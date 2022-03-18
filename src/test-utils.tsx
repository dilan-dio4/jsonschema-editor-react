import * as React from "react"
import { render, RenderOptions } from "@testing-library/react"
import { ChakraProvider, theme } from "@chakra-ui/react"
import { ThemeProvider, createTheme } from "@mui/material/styles"

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <ThemeProvider theme={createTheme({})}><ChakraProvider theme={theme}>{children}</ChakraProvider></ThemeProvider>
)

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options })

export { customRender as render }
