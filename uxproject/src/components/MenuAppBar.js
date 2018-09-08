import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import {Link} from "react-router-dom"
const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  }
};

class MenuAppBar extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Grappther
          </Typography>

          <div>
            <Link to="/perfil">
              <IconButton aria-haspopup="true" color="inherit">
                <Avatar />
              </IconButton>
            </Link>
            <Link to="/" style = {{color:"#fff" , textDecoration:"none"}}>
              <Button aria-haspopup="true" color="inherit">
                HOME
              </Button>
            </Link>
            <Link to="/crearTutoria" style = {{color:"#fff" , textDecoration:"none"}}>
              <Button aria-haspopup="true" color="inherit">
                CREAR TUTORIA
              </Button>
            </Link>
            <Button aria-haspopup="true" color="inherit">
              LOGOUT
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuAppBar);
