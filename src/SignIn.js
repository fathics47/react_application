import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IconButton, InputAdornment } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { MyContext } from "./App";

function Copyright(props) {
  return (
    <Typography
      variant="h6"
      color="white"
      backgroundColor="#1976d2"
      align="center"
      {...props}
    >
      {"All Rights Reserved © "}
    </Typography>
  );
}

const theme = createTheme({
    palette: {
        background: {
            default: "rgb(168, 168, 168)"
        },
    }
});

export default function SignIn() {
    const { setLogIn } = useContext(MyContext);

  const [showPassword, setVisibility] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState(null);
  const [password, setPassword] = useState("");
  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const res = await axios
      .post("http://localhost:3001/api/login", {
        email: data.get("email"),
        password: data.get("password"),
      })
    if (res.data === "success") {
      sessionStorage.setItem("email", data.get("email"));
      setLogIn(true);
    } else {
      if (res.data === "email") {
        setEmailError("Email not registered");
      } else if (res.data === "password") {
        setPassError(["Wrong Password"]);
      } else {
        alert("try again later");
      }
    }
  };


    
    useEffect(() => {
        if (email !== "") {
           const re =
             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
           if (!re.test(String(email).toLowerCase())) {
             setEmailError("Enter valid Email");
           } else {
             setEmailError("");
           } 
        }
    }, [email]);
    
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <h1 style={{textAlign: "center"}}>Sample</h1>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            border: "1px grey",
            borderRadius: "1rem",
          }}
          p={2}
        >
          <Typography component="h1" variant="h5">
            Admin - Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              error={emailError !== ""}
              helperText={emailError}
              name="email"
              autoComplete="email"
              autoFocus
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              error={Array.isArray(passError)}
              helperText={
                <ul>
                  {passError?.map((row, i) => (
                    <li key={i}>{row}</li>
                  ))}
                </ul>
              }
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setVisibility(!showPassword)}
                    >
                      {showPassword && <LockOpenIcon />}
                      {!showPassword && <LockIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Grid container>
              <Grid item xs sx={{ mt: 3, mb: 2 }}>
                <Link href="/changepassword">Forgot password?</Link>
              </Grid>
              <Grid item>
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Sign In
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
