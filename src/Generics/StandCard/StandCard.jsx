import './StandCard.css'
import Modal from 'react-modal'
import { useState } from 'react'

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
                    <div className='btns'>
                        <button type="button" className='btnSave'>Editar</button>
                        <button type="button" onClick={() => setModalIsOpen(false)} className='btnCancel'>Cancelar</button>
                    </div>
                </form>
            </Modal>
            <article className='infoCard'>
                <h3>Card Title</h3>
                <p>No. Card</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
            </article>
            <p className="ShowMore" onClick={() => { setModalIsOpen(true) }}>Leer más</p>
        </div>
    )
}

export default StandCard