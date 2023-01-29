import Home from './Pages/Home';
import Rules from './Pages/Rules';
import LeaderBoard from './Pages/LeaderBoard';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useTheme(prefersDarkMode);
  const colorMode = React.useContext(ColorModeContext);
  return (
    <div>
      <CssBaseline />
      <Router>
        <div className="Central">
          <Routes>
            <Route
              path="/Home"
              element={<Home />}
            />
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/DailySudoku"
              element={<Home />}
            />
            <Route
              path="/Rules"
              element={<Rules />}
            />
            <Route
              path="/LeaderBoard"
              element={<LeaderBoard />}
            />
          </Routes>
        </div>
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
        <BottomNavigation showLabels>
          <BottomNavigationAction component={Link} to="/Rules" label="How to Play" icon={<ContactPageIcon />} />
          <BottomNavigationAction component={Link} to="/DailySudoku" label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction onClick={colorMode.toggleColorMode} label="Toggle Dark-Mode" icon={theme.palette.mode === 'dark' ? <ToggleOffIcon /> : <ToggleOnIcon />} />
        </BottomNavigation>
        </Paper>
      </Router>
    </div>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState('dark');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
