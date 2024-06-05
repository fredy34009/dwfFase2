import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { FaTrashAlt } from "react-icons/fa";

function Detalle() {
    const host = 'http://localhost:8080';
    const { curso } = useParams();
    const { nombre } = useParams();
    const [alumnos, setAlumnos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [alumno, setAlumno] = useState([])
    const [cursox, setCursox] = useState([])

    const toggleModal = (al) => {
        setAlumno(al)
        setCursox(al.curso)
        setShowModal(!showModal);
    };
    const toggleModalAlumno = () => {
        setShowModal2(!showModal2);
    };
    const toggleModal2 = () => {
        setShowModal(!showModal);
    };
    const eliminarIncripcion = async (al) => {
        al.inscrito = 0;
        const response = await axios.put(host + '/clase/id/alumno/' + al.id, al);
        refres();
    }
    const refres=async()=>{
        const respons = await axios.get(host + '/curso/' + curso + '/alumno');
        setAlumnos(respons.data);
    }
    const inscribir = async (al) => {
        al.inscrito = 1;
        const response = await axios.put(host + '/clase/id/alumno/' + al.id, al);
        refres()
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(host + '/curso/' + curso + '/alumno');
                setAlumnos(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    const [nombreAlumno, setNombreAlumno] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [numeroTelefono, setNumeroTelefono] = useState('');
    const [email, setEmail] = useState('');

    const nuevoAlumno = async () => {
        const Al = {
            "nombreAlumno": nombreAlumno,
            "fechaNacimiento": fechaNacimiento,
            "numeroTelefono": numeroTelefono,
            "email": email,
            "curso":{'id':curso},
            "inscrito": 1
        }
        const response = await axios.post(host + '/curso/id/alumno', Al);
        toggleModalAlumno();
        refres()
    }

    return (
        <div className="container">
            <div><h2>Curso: {nombre}  </h2>
                <button className="btn btn-dark float float-end" onClick={() => toggleModalAlumno()}>NUEVO ALUMNO</button></div>
            <hr />
            <h4>Lista de estudiantes</h4>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID Alumno</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Fecha Nacimiento</th>
                        <th scope="col">Email</th>
                        <th scope="col">Operaciones</th>
                    </tr>
                </thead>
                <tbody>
                    {alumnos.map((al, id) => (
                        <tr key={id} >
                            <th scope="row">{al.id}</th>
                            <td>{al.nombreAlumno}</td>
                            <td>{al.numeroTelefono}</td>
                            <td>{al.fechaNacimiento}</td>
                            <td>{al.email}</td>
                            <td><button className="btn btn-outline-secondary" onClick={() => toggleModal(al)} >Ver</button>
                                {al.inscrito == 1 ? <button className="btn btn-secondary">INSCRITO</button> : <button onClick={() => inscribir(al)} className="btn btn-dark">INSCRIBIR</button>}
                                <button title="Eliminar inscripcion" className="btn" onClick={() => eliminarIncripcion(al)} ><FaTrashAlt /></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal isOpen={showModal}
                onRequestClose={toggleModal2}
                contentLabel="Detalle Alumno"
            > <h2>Detalle de Alumno {alumno.nombreAlumno}</h2>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Nombre: {alumno.nombreAlumno}</li>
                    <li class="list-group-item">Telefono: {alumno.numeroTelefono}</li>
                    <li class="list-group-item">Nacimiento: {alumno.fechaNacimiento}</li>
                    <li class="list-group-item">Email: {alumno.email}</li>
                    <li class="list-group-item">Curso: {cursox.nombreCurso}</li>
                    <li class="list-group-item">Profesor: {cursox.nombreProfesor}</li>
                    <li class="list-group-item">Telefono Profesor: {cursox.numeroTelefono}</li>
                    <li class="list-group-item">Email Profesor: {cursox.email}</li>
                    <li class="list-group-item">Inscrito: {alumno.inscrito == 1 ? 'INSCRITO' : 'NO INSCRITO'}</li>
                </ul>
                <button className="btn btn-success" onClick={toggleModal2}>Aceptar</button>
            </Modal>
            <Modal isOpen={showModal2}
                onRequestClose={toggleModalAlumno}
                contentLabel="Detalle Alumno"
            > <h2>Curso {nombre} Nuevo Alumno</h2>
                <label>Nombre del Alumno</label>
                <input className="form-control" onChange={(e) => setNombreAlumno(e.target.value)} type="text" placeholder="Nombre" name="nombreAlumno" />
                <label>Fecha de Nacimiento</label>
                <input className="form-control" onChange={(e) => setFechaNacimiento(e.target.value)} type="date" placeholder="Fecha Nacimiento" name="fechaNacimiento" />
                <label>Telefono</label>
                <input className="form-control" type="text" onChange={(e) => setNumeroTelefono(e.target.value)} placeholder="Numero Telefonico" name="numeroTelefono" />
                <label>Email</label>
                <input className="form-control" type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Email" name="email" />
                <button className="btn btn-success" onClick={() => nuevoAlumno()}>Agregar</button>
            </Modal>
        </div>
    )
}
export default Detalle