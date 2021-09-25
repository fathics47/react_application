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
import { useEffect, useState } from "react";
import axios from "axios";
import { textAlign } from "@mui/system";

const theme = createTheme({
  palette: {
    background: {
      default: "rgb(168, 168, 168)",
    },
  },
});

export default function ChangePassword(props) {
  const [showPassword, setVisibility] = useState(false);
  const [showPassword1, setVisibility1] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState(null);
  const [passError1, setPassError1] = useState(null);
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [ovrallerror, SetOverallError] = useState({bool:false,msg:""});

  const handleSubmit = (event) => {
    event.preventDefault();


    // eslint-disable-next-line no-console
    if (password === repassword) {
      axios
        .post("http://localhost:3001/api/changepassword",{email:email,newpass:repassword})
        .then((res) => {
          
          if(res.data.affectedRows===0)
          {
            SetOverallError({bool:true,msg:"user does not exist"});  
          }

          
          else if(res.data.affectedRows!==0)
          {
            props.history.push("/")
          }

          else{

            SetOverallError({bool:true,msg:"please try again later"}); 
          }

        });
    } else {
      SetOverallError({bool:true,msg:"please try again later"}); 
    }
  };

  useEffect(() => {
    if (password !== "") {
      const re_digit = /^(?=.*\d)[a-zA-Z\d!@#$%^&*]{1,}$/,
        re_lower = /^(?=.*[a-z])[a-zA-Z\d!@#$%^&*]{1,}$/,
        re_upper = /^(?=.*[A-Z])[a-zA-Z\d!@#$%^&*]{1,}$/,
        re_special = /^(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{1,}$/,
        re_min = /^[a-zA-Z\d!@#$%^&*]{8,16}$/;
      let message = [];
      if (!re_min.test(String(password))) {
        message.push("Password should be 8-16 characters\n");
      }
      if (!re_lower.test(String(password))) {
        message.push("Password should have atleast one lower case character\n");
      }
      if (!re_upper.test(String(password))) {
        message.push("Password should have atleast one upper case character\n");
      }
      if (!re_digit.test(String(password))) {
        message.push("Password should have atleast one digit\n");
      }
      if (!re_special.test(String(password))) {
        message.push(
          "Password should have atleast one special case character\n"
        );
      }
      setPassError(message.length === 0 ? null : message);
    }
  }, [password]);

  useEffect(() => {
    if (repassword !== "") {
      const re_digit = /^(?=.*\d)[a-zA-Z\d!@#$%^&*]{1,}$/,
        re_lower = /^(?=.*[a-z])[a-zA-Z\d!@#$%^&*]{1,}$/,
        re_upper = /^(?=.*[A-Z])[a-zA-Z\d!@#$%^&*]{1,}$/,
        re_special = /^(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{1,}$/,
        re_min = /^[a-zA-Z\d!@#$%^&*]{8,16}$/;
      let message = [];
      if (!re_min.test(String(password))) {
        message.push("Password should be 8-16 characters\n");
      }
      if (!re_lower.test(String(password))) {
        message.push("Password should have atleast one lower case character\n");
      }
      if (!re_upper.test(String(password))) {
        message.push("Password should have atleast one upper case character\n");
      }
      if (!re_digit.test(String(password))) {
        message.push("Password should have atleast one digit\n");
      }
      if (!re_special.test(String(password))) {
        message.push(
          "Password should have atleast one special case character\n"
        );
      }
      setPassError1(message.length === 0 ? null : message);
    }
  }, [repassword]);

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
            CHANGE PASSWORD
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
              name="New-password"
              label="New-Password"
              type={showPassword ? "text" : "password"}
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

            <TextField
              margin="normal"
              required
              fullWidth
              name="Re-enter-Password"
              label="Re-enter-Password"
              type={showPassword1 ? "text" : "password"}
              value={repassword}
              onChange={(e) => {
                setRePassword(e.target.value);
              }}
              error={Array.isArray(passError1)}
              helperText={
                <ul>
                  {passError1?.map((row, i) => (
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
                      onClick={() => setVisibility1(!showPassword1)}
                    >
                      {showPassword1 && <LockOpenIcon />}
                      {!showPassword1 && <LockIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
            >
              {ovrallerror.bool ? (
                <Grid item sm={12}>
                  <p style={{ color: "red", textTransform: "capitalize" }}>
                    {ovrallerror.msg}
                  </p>
                </Grid>
              ) : null}
              <Grid item>
                {!Array.isArray(passError1) && !Array.isArray(passError) ? (
                  <Button
                    style={{ display: "flex", justifyContent: "center" }}
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    submit
                  </Button>
                ) : null}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
