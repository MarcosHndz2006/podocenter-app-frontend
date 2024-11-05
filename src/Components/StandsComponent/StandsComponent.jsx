import './StandsComponent.css'
import HeaderGeneric from '../../Generics/HeaderGeneric/HeaderGeneric'
import StandCard from '../../Generics/StandCard/StandCard'
import { useState } from 'react'
import { MdOutlineFilterNone } from "react-icons/md";

function StandsComponent() {

    const [stands, setStands] = useState([
        <StandCard />,
        <StandCard />,
        <StandCard />,
        <StandCard />
    ])

    const renderStands = () => {
        if (stands.length == 0) {
            return <MdOutlineFilterNone />
        } else {
            return stands
        }
    }

    return (
        <div className='standsComponentDiv'>
            <HeaderGeneric username="@username" route="/podocenter/inventory">Almacenes y estanterías</HeaderGeneric>
            <section className='standsContainer'>
                <div className='warehousesContainer'>
                    <h2>Almacenes</h2>
                    {
                        renderStands()
                    }
                </div>
                <div className='shelvesContainer'>
                    <h2>Estanterías</h2>
                    {
                        renderStands()
                    }
                </div>
            </section>
        </div>
    )
}

export default StandsComponent