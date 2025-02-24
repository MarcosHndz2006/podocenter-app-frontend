//importe de archivo .css
import './InventoryItem.css'

function InventoryItem({ name, component, clasification,
    expiration, house, unit, price }) {
    return (
        <div className='inventoryItemComponent'>
            <p>{name}</p>
            <p>{component}</p>
            <p>{clasification}</p>
            <p>{expiration}</p>
            <p>{house}</p>
            <p>{unit}</p>
            <p>{price}</p>
        </div>
    )
}

export default InventoryItem