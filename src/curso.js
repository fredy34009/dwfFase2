import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Curso() {
    const host = 'http://localhost:8080';
    const [cursos, setCursos] = useState([]);
    const [inscritos, setInscritos] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(host + '/curso');
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);
    async function obtenerEntero(parametro) {
        //const response =await axios.get(host + '/conteo/' + parametro);
        return 5
    }
    function obtener(parametro) {
        obtenerEntero(parametro);
    }
    return (
        <div className="container">
            <h2>Cursos de facultad Estudios Tecnologicos</h2>
            <h6>LISTADO DE CURSOS DISPONIBLES</h6>
            <div className='row'>
                {cursos.map((elemento, id) => (
                    <div key={id} className="col-sm-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title center">{elemento.nombreCurso}</h5>
                                <p className="card-text">Impartido por: <i className='textDocente'>{elemento.nombreProfesor}</i></p>
                                <p className="card-text">Estudiantes inscritos: <i className='textDocente'>{obtenerEntero(elemento.id)}</i></p>
                                <div className="center"> <Link className="btn btn-dark " to={{ pathname: '/detalle/' + elemento.id + '/' + elemento.nombreCurso }}>Ver</Link></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Curso