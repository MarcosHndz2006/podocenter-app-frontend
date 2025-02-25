//importe de archivo .css
import './StandCard.css'
//importes de componentes y reutilizables
import Modal from 'react-modal'
import { useState } from 'react'
import GeneralButton from '../GeneralButton/GeneralButton';

function StandCard() {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <div className='standCard'>
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
                    <h2 className='titleModal'>Card Title</h2>
                </div>
                <form className='formModal'>
                    <article>
                        <p><b>No. de niveles</b></p>
                        <p>33</p>
                    </article>
                    <article>
                        <p><b>No. de divisiones</b></p>
                        <p>3</p>
                    </article>
                    {/* sección de botones */}
                    <div className='itemsContainerFooter'>
                        <GeneralButton event={() => { setModalIsOpen(false) }}>Agregar</GeneralButton>
                        <GeneralButton event={() => { setModalIsOpen(false) }}>Salir</GeneralButton>
                    </div>
                </form>
            </Modal>
            <article className='infoCard'>
                <h3>Card Title No. Card</h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
            </article>
            <p className="ShowMore" onClick={() => { setModalIsOpen(true) }}>Leer más</p>
        </div>
    )
}

export default StandCard