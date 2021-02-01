import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import home from "./pages/Home";
import login from "./pages/Login";
import signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import "./App.css";

const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#0B0B0B",
      contrastText: "#CDDC39",
    },
    secondary: {
      main: "#27292D",
    },
  },
});
function App() {
  return (
    <MuiThemeProvider theme={darkTheme}>
      <div className="App">
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/login" component={login} />
              <Route exact path="/signup" component={signup} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
