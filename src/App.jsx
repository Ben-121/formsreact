import React, { useState } from "react";
import { Typography, Box, TextField, Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Admin from "./Admin.jsx";
import UserPage from "./User.jsx";

function FixedContainer() {
  const [formData, setFormData] = useState({
    fname: "",
    username: "",
    password: "",
  });
  const [signup, setSignup] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSnackbarOpen = (message, duration = 10000) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
    setTimeout(() => {
      setOpenSnackbar(false);
    }, duration);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (signup) {
      if (formData.username.length === 0 || formData.password.length < 8) {
        handleSnackbarOpen("Error: Please check your username or Password");
      } else {
        const userData = { ...formData };
        const existingUsers = JSON.parse(localStorage.getItem("a")) || [];
        const isUserExists = existingUsers.some(
          (user) => user.username === userData.username
        );
        if (isUserExists) {
          handleSnackbarOpen("Error: User already exists");
        } else {
          existingUsers.push(userData);
          localStorage.setItem("a", JSON.stringify(existingUsers));
          handleSnackbarOpen("Registered Successfully");
          const navigationResult = navigate("/User");
          console.log("Navigation Result:", navigationResult); // Log the result of navigation
        }
      }
    } else {
      const existingUsers = JSON.parse(localStorage.getItem("a")) || [];
      const matchedUser = existingUsers.find(
        (user) =>
          user.username === formData.username &&
          user.password === formData.password
      );
      if (
        matchedUser ||
        (formData.username === "admin" && formData.password === "admin@123") ||
        (formData.username === "ben" && formData.password === "Password123")
      ) {
        handleSnackbarOpen("Login Successfully");
        if (formData.username === "admin") {
          navigate("/Admin");
        } else {
          navigate("/User");
        }
      } else {
        handleSnackbarOpen("Login failed, please check your credentials.");
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          maxWidth={400}
          margin="auto"
          padding={6}
          justifyContent="center"
          alignItems="center"
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
        >
          <Typography padding={3} textAlign="center">
            {signup ? "SignUp" : "Login"}
          </Typography>
          {signup && (
            <TextField
              className="fname"
              onChange={handleChange}
              name="fname"
              value={formData.fname}
              margin="normal"
              type="text"
              variant="outlined"
              sx={{ width: "100%" }}
              placeholder="Name"
            />
          )}
          <TextField
            className="username"
            onChange={handleChange}
            name="username"
            value={formData.username}
            margin="normal"
            type="text"
            variant="outlined"
            sx={{ width: "100%" }}
            placeholder="Username"
          />
          <TextField
            className="password"
            onChange={handleChange}
            name="password"
            value={formData.password}
            margin="normal"
            sx={{ width: "100%" }}
            type="password"
            variant="outlined"
            placeholder="Password"
          />
          <Button
            margin="normal"
            variant="contained"
            color={"error"}
            type="submit"
            sx={{ width: "100%" }}
          >
            {signup ? "Register" : "Login"}
          </Button>
          <Button
            onClick={() => setSignup(!signup)}
            style={{ marginTop: 15, borderRadius: 5 }}
            variant="text"
            sx={{ width: "100%" }}
          >
            {signup ? "Login" : "SignUp"}
          </Button>
        </Box>
      </form>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Admin" element={<Admin />} />
        <Route path="/User/" element={<UserPage />} />
        <Route path="/User/:categoryList" element={<UserPage />} />
        <Route path="/" element={<FixedContainer />} />
      </Routes>
    </Router>
  );
}
