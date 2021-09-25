import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StudentTable from "./StudentTable";
import LogOut from "./logOut"
import AddBoxIcon from '@mui/icons-material/AddBox';
import StudentForm from "./StudentForm";
import StudentUpdateForm from "./StudentUpdateForm";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import { Button } from "@mui/material";
import { Icon } from "@mui/material";
import "./dashboard.css";
import { HomeOutlined } from "@material-ui/icons";
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [createstate, SetCreateState] = React.useState(false)
  const [idUpdate, setUpdate] = React.useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const handlecreation=()=>{
    SetCreateState(true)
  }

  const handlecancel=()=>{
    SetCreateState(false)
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2 }}
          >
            {!open && <MenuIcon />}
          </IconButton>
          {!open && (
            <Typography variant="h6" noWrap component="h1" sx={{ flexGrow: 1 }}>
              Sample
            </Typography>
          )}
          <div style={{ marginLeft: "auto" }}>
            <LogOut />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader style={{ backgroundColor: "#1976d2" }}>
          <Typography
            variant="h6"
            noWrap
            component="h1"
            sx={{ flexGrow: 1, color: "white" }}
          >
            Sample
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <div
          style={{ color: "white", height: "100%" }}
          className={open ? "open" : ""}
        >
          <div style={{ display: "flex" }}>
            <AccountCircleIcon style={{ fontSize: "80" }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: "0.8rem", marginTop: "15%" }}>
                {sessionStorage.getItem("email")}
              </div>
              <div style={{ fontSize: "0.8rem" }}>🔔Active</div>
            </div>
          </div>
          <List>
            <ListItem button key={"employement"}>
              <ListItemIcon style={{ color: "white" }}>
                <AssignmentIndOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={"employement"} />
            </ListItem>
            <ListItem button key={"more"}>
              <ListItemIcon style={{ color: "white" }}>
                <MoreVertOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={"more"} />
            </ListItem>
            <ListItem button key={"settings"}>
              <ListItemIcon style={{ color: "white" }}>
                <SettingsOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={"settings"} />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button onClick={() => {
              setUpdate(null)
              SetCreateState(false)
            }}>
              <ListItemIcon style={{ color: "white" }}>
                <HomeOutlined />
              </ListItemIcon>
              <ListItemText primary="Student Details" />
            </ListItem>
            <ListItem button onClick={() => handlecreation()}>
              <ListItemIcon style={{ color: "white" }}>
                <AddBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Create Student" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {idUpdate ? (
          <StudentUpdateForm
            id={idUpdate}
            isDone={(res) => {
              if (res) {
                setUpdate(null);
              }
            }}
          />
        ) : createstate === false ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ marginLeft: "auto" }}>
              <Button
                variant="conatined"
                style={{ color: "white", backgroundColor: "#1976d2" }}
                onClick={() => handlecreation()}
              >
                <Icon>
                  <AddBoxIcon />
                </Icon>
                {"Create Student"}
              </Button>
            </div>
            <StudentTable
              setUpdate={(id) => {
                setUpdate(id);
              }}
            />
          </div>
        ) : (
          <StudentForm handlecancel={handlecancel} />
        )}
      </Main>
    </Box>
  );
}