import React, { Component } from "react";
import "../bootstrap.min.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Button from '@material-ui/core/Button';

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Portrait";


const UserProfile = ({ profileObject, uid, clases }) => {


    return (
        <div>
            <div className="jumbotron">
                <h1>Usuario: {profileObject.nombre}</h1>
                <p>Aquí puedes ver la información del tutor.</p>

                <Button raised="true" type="button" className="btn btn-primary">Enviar mensaje </Button>
            </div>

            <div className="container">

                <div className="col-xs-2">
                    <label htmlFor="ex1">Nombre</label>
                    <input readOnly className="mt-2 col-md-12  form-control-static" id="nombre" type="text" placeholder={profileObject.nombre} />
                </div>

                <div className="col-xs-2">
                    <label htmlFor="ex1">Carrera</label>
                    <input readOnly className="mt-2 col-md-12  form-control-static" id="carrera" type="text" placeholder={profileObject.carrera} />

                </div>

                <div className="">
                    <label htmlFor="ex1">Email</label>
                    <input readOnly className="mt-2 col-md-12  form-control-static" id="email" type="text" placeholder={profileObject.email} />
                </div>



                <Grid container spacing={16}>

                    <Grid item xs={12} md={6}>
                        <Typography style={{ flex: 1 }}>
                            Tutorías disponibles
                        </Typography>


                        <List>


                            {clases.map((e) => {
                                return <ListItem primarytext={e} key={e}>
                                    <ListItemSecondaryAction >
                                    </ListItemSecondaryAction>
                                    <ListItemText
                                        primary={e}
                                    />

                                </ListItem>;
                            })}


                        </List>

                    </Grid>

                </Grid>

                <br />
            </div>

        </div>

    );
};





export { UserProfile };