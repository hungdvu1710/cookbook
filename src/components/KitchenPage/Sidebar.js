import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import "../KitchenPage/Sidebar.css";

export default function Sidebar() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box 
      sx={{width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className="kitchen">
        <Link to="/kitchen">
          <ListItem button>
            <ListItemIcon>
              <FoodBankIcon />
            </ListItemIcon>
            <ListItemText primary={"My Kitchen"} />
          </ListItem>
        </Link>

        <Link to="/">
          <ListItem button>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary={"Search"} />
          </ListItem>
        </Link>

        <Link to="/about">
          <ListItem button>
            <ListItemIcon>
              <LightbulbIcon />
            </ListItemIcon>
            <ListItemText primary={"About"} />
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            {" "}
            <MenuIcon className="menuIcon" />
          </Button>
          <Drawer
            PaperProps={{
              sx: {
                backgroundColor: "rgba(242, 241, 230)",
                fontFamily: "Arial",
              },
            }}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
