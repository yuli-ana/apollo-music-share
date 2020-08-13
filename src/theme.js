import { createMuiTheme } from '@material-ui/core';
import { teal, purple } from '@material-ui/core/colors';
import { dark } from '@material-ui/core/styles/createPalette';

//To make theme available for each react component will use react context hook

const theme = createMuiTheme({
    palette: {
        // In addition type property sets light/dark theme
        type: "dark",
        primary: teal,
        secondary: purple
    }
})

export default theme;