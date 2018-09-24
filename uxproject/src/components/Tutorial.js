import React, { Component } from 'react';

class Tutorial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      student: "",
      date: "",
      hour: "",
      class: "",
      theme: "",
      advisor: "",
    }
  }

  /*
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    console.log(event.target.value);
  };
  */

  render() {
    return (
      <div>
        <div className="jumbotron">
          <p>Tutorías</p>
        </div>
        <div className="container">
          <div className="col-xs-2">
            <label htmlFor="ex1">Alumno</label>
            <input className="w-50 form-control" id="student" type="text" placeholder="Nombre..." />
          </div>

          <div className="col-xs-2">
            <label htmlFor="ex1">Fecha</label>
            <input className="w-50 form-control" id="date" type="text" placeholder="DD/MM/YYYY" />
          </div>

          <div className="col-xs-2">
            <label htmlFor="ex1">Hora</label>
            <input className="w-50 form-control" id="hour" type="text" placeholder="HH:MM" />
          </div>

          <div className="col-xs-2">
            <label htmlFor="ex1">Clase</label>
            <input className="w-50 form-control" id="class" type="text" placeholder="Nombre de la Clase" />
          </div>

          <div className="">
            <label htmlFor="ex1">Tema</label>
            <input className="w-50 form-control" id="theme" type="text" placeholder="Tema de la Clase" />
          </div>

          <div className="col-xs-2">
            <label htmlFor="ex1">Tutor</label>
            <input className="w-50 form-control" id="advisor" type="text" placeholder="Nombre del Tutor" />
          </div>

          <br /><button type="button" className="btn btn-primary">Guardar Cambios</button>
        </div>
      </div>
    );
  }
}

export default Tutorial;
