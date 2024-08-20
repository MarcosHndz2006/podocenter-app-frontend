import HeaderGeneric from '../../Generics/HeaderGeneric/HeaderGeneric';
import SearchInput from '../../Generics/SearchInput/SearchInput';
import './InventoryComponent.css';


function InventoryComponent() {
  return (
    <div className='inventoryComponent'>
        <HeaderGeneric username="@username">Inventario</HeaderGeneric>
        <SearchInput/>
        <p>Opciones avanzadas de búsqueda</p>
        <p>Resultados encontrados</p>
        <section className='dataSectionInventory'>
            
        </section>
        <section className='buttonOptions'>
          <button className='generateReportButton'>Generar Reporte</button>
          <button className='AddItemButton'>Agregar Producto</button>
        </section>
    </div>
  );
}

export default InventoryComponent