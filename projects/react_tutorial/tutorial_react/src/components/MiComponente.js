import React from 'react';

class MiComponente extends React.Component {

    render() {
        let variable = {
            nombre: 'Manuel',
            apellidos: ['Garre', 'Ros'],
            edad: 32
        }
        return (
            <React.Fragment>
                <h1>{'Nombre:' + variable.nombre}</h1>
                <hr />
                <h2>{'Edad: ' + variable.edad}</h2>
                <hr />
                <ul>
                    {
                        variable.apellidos.map((apellido, i) => {
                            return (
                                    <li key={i}>{apellido}</li>
                            )
                        })
                    }
                </ul>
                <hr />
            </React.Fragment>
        );
    }

}

export default MiComponente;