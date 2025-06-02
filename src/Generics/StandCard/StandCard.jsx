//importe de archivo .css
import './StandCard.css'
//importes de componentes y reutilizables
import Modal from 'react-modal'
import { useState } from 'react'
import GeneralButton from '../GeneralButton/GeneralButton';
import { TiDelete } from "react-icons/ti";

function StandCard({ levels, divisions, name, full, almacen, event, id }) {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    /* función para enviar la confirmación de eliminación del estante */
    const handleDelete = (e) => {
        event(e.target.parentElement.id)
    }

    return (
        <div className='standCard' id={id}>
            <TiDelete className='standDeleteBtn' onClick={handleDelete} />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Card Title"
                style={{
                    content: {
                        width: '500px',
                        margin: 'auto',
                        padding: '0',
                        fontFamily: "Roboto",
                        fontWeight: "light",
                    }
                }}
            >
                <div className='modalDiv'>
                    <h2 className='titleModal'>Estante {name}</h2>
                </div>
                <form className='formModal'>
                    <article>
                        <p><b>No. de niveles</b></p>
                        <p>{levels}</p>
                    </article>
                    <article>
                        <p><b>No. de divisiones</b></p>
                        <p>{divisions}</p>
                    </article>
                    <article>
                        <p><b>Ubicación</b></p>
                        <p>Almacen {almacen}</p>
                    </article>
                    {/* sección de botones */}
                    <div className='itemsContainerFooter'>
                        <GeneralButton event={() => { setModalIsOpen(false) }}>Agregar</GeneralButton>
                        <GeneralButton event={() => { setModalIsOpen(false) }}>Salir</GeneralButton>
                    </div>
                </form>
            </Modal>
            <article className='infoCard'>
                <h3>Estante {name}</h3>
                <p>
                    {full == 0 ? 'Espacio disponible' : 'Lleno'}.
                </p>
            </article>
            <p className="ShowMore" onClick={() => { setModalIsOpen(true) }}>Leer más</p>
        </div>
    )
}

export default StandCard