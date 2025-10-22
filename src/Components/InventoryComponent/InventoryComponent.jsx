
import './InventoryComponent.css';
import HeaderGeneric from '../../Generics/HeaderGeneric/HeaderGeneric';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import GeneralButton from '../../Generics/GeneralButton/GeneralButton';
import { Pagination } from '@mui/material';
import Modal from 'react-modal';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import box from '../../assets/img/open-box.png';
import vacio from '../../assets/img/conjunto-vacio.png';
import InventoryItem from '../../Generics/InventoryItem/InventoryItem';
import NoneResults from '../../Generics/NoneResults/NoneResults';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useInventoryComponent } from '../../hooks/useInventoryComponent';

function InventoryComponent() {

  // Obtener toda la lógica del hook personalizado
  const {
    // Estados
    username,
    providers,
    modalIsOpen,
    setModalIsOpen,
    providerModalIsOpen,
    setProviderModalIsOpen,
    clasifications,
    units,
    farmacehouses,
    shelfs,
    newItem,
    filter,
    page,
    filteredItems,
    
    // Funciones
    handleFilterChange,
    handleNewItemChange,
    AddItem,
    handleDelete,
    deleteOneProvider,
    cleanFilters,
    nav,
    stores,
    editProvider,
    paginationHandle,
    paginationSize
  } = useInventoryComponent();

  // Funciones de renderizado (estas se mantienen aquí porque son específicas del JSX)
  const renderItems = () => {
    if (filteredItems.length === 0) {
      return <NoneResults />;
    } else {
      const initialIndex = page * 13 - 13;
      const finalIndex = page * 13;
      console.log(initialIndex);
      const toRenderItems = filteredItems.slice(initialIndex, finalIndex);

      return toRenderItems.map((item) => (
        <InventoryItem
          key={`${item.id_producto}`}
          id={item.id_producto}
          name={item.nombre_comercial}
          component={item.componente_principal}
          secondaryComponent={item.componente_secundario}
          clasification={item.nombre_clasificacion_producto}
          clasificationId={item.id_clasificacion_producto}
          Presentation={item.presentacion}
          lot={item.lote}
          expDate={item.vencimiento}
          house={item.nombre_casa_farmaceutica}
          houseId={item.id_casa_farmaceutica}
          unit={item.nombre_unidad}
          unitId={item.id_unidad}
          price={item.precio_unitario}
          onDelete={handleDelete}
          units={units}
          clasifications={clasifications}
          farmacehouses={farmacehouses}
          quantity={item.existencias}
        />
      ));
    }
  };

  const renderTitles = () => {
    const titles = [
      'Nombre comercial',
      'Componente principal',
      'Componente secundario',
      'Clasificación',
      'Vencimiento',
      'Casa farmacéutica',
      'Unidad',
      'Precio unitario'
    ];
    return titles.map((title, index) => <p key={index}>{title}</p>);
  };

  const renderShelfs = () => {
    return shelfs.map(shelf => {
      if (shelf.lleno == 0) {
        return <MenuItem key={shelf.id_estante} value={shelf.id_estante}>
          {shelf.nombre_estante}
        </MenuItem>
      }
    })
  }

  const renderClasifications = () => {
    return clasifications.map((clas) => {
      return <MenuItem key={`${clas.id_clasificacion_producto}`}
        value={`${clas.id_clasificacion_producto}`}>
        {clas.nombre_clasificacion_producto}
      </MenuItem>
    })
  }

  const renderUnits = () => {
    return units.map((unit) => {
      return <MenuItem key={`${unit.id_unidad}`} value={`${unit.id_unidad}`}>
        {unit.nombre_unidad}
      </MenuItem>
    })
  }

  const renderFarmacehouses = () => {
    return farmacehouses.map((farmacehouse) => {
      return <MenuItem key={`${farmacehouse.id_casa_farmaceutica}`}
        value={`${farmacehouse.id_casa_farmaceutica}`} >
        {farmacehouse.nombre_casa_farmaceutica}
      </MenuItem>
    })
  }

  return (
    <div className='inventoryComponent'>
      <HeaderGeneric username={username} route='/podocenter/home'>
        Inventory
      </HeaderGeneric>
      <div className='inventoryContainer'>
        {/* sección del menú de filtrado de objetos */}
        <section className='filterSection'>
          <p>Filtrar por...</p>
          <div className='filters'>
            <TextField
              id='standard-basic-comercialName'
              label='Nombre comercial'
              variant='standard'
              name='comercialName'
              onChange={handleFilterChange}
            />
            <TextField
              id='standard-basic-principalComponent'
              label='Componente principal'
              variant='standard'
              name='principalComponent'
              onChange={handleFilterChange}
            />
            <TextField
              id='standard-basic-secondaryComponent'
              label='Componente secundario'
              variant='standard'
              name='secondaryComponent'
              onChange={handleFilterChange}
            />
            <FormControl sx={{ width: '200px' }}>
              <InputLabel id='demo-simple-select-label-clasification'>
                Clasificación
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={filter.Clasiffication}
                label='Clasificación'
                name='Clasiffication'
                onChange={handleFilterChange}
              >
                {
                  renderClasifications()
                }
              </Select>
            </FormControl>
            <TextField
              id='standard-basic-presentation'
              label='Presentación'
              variant='standard'
              name='Presentation'
              onChange={handleFilterChange}
            />
            <article className='inputDate'>
              <InputLabel id='demo-simple-select-label-expDate'>
                Vencimiento
              </InputLabel>
              <TextField
                id='standard-basic'
                variant='standard'
                type='date'
                name='expDate'
                onChange={handleFilterChange}
              />
            </article>
            <FormControl sx={{ width: '200px' }}>
              <InputLabel id='demo-simple-select-label-unit'>Unidad</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={filter.unit}
                label='Unidad'
                name='unit'
                onChange={handleFilterChange}
              >
                {
                  renderUnits()
                }
              </Select>
            </FormControl>
            <FormControl sx={{ width: '200px' }}>
              <InputLabel id='demo-simple-select-label-farmacehouse'>
                Casa farmaceutica
              </InputLabel>
              <Select
                labelId='demo-simple-select-label-farmacehouse'
                id='demo-simple-select'
                value={filter.farmacehouse}
                label='Casa farmaceutica'
                name='farmacehouse'
                onChange={handleFilterChange}
              >
                {
                  renderFarmacehouses()
                }
              </Select>
            </FormControl>
          </div>
          <GeneralButton event={cleanFilters}>Limpiar</GeneralButton>
        </section>
        {/* sección de productos de inventario */}
        <section className='itemsContainer'>
          <div className='itemsContainerHeader'>{renderTitles()}</div>
          <div className='itemsContainerElements'>{renderItems()}</div>
          <div className='itemsContainerFooter'>
            <Pagination count={paginationSize()} size="large" onChange={paginationHandle} />
            <GeneralButton event={() => setModalIsOpen(true)}>Nuevo ítem</GeneralButton>
            <GeneralButton event={() => setProviderModalIsOpen(true)}>Proveedores</GeneralButton>
            <GeneralButton event={stores}>Almacenes</GeneralButton>
          </div>
        </section>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel='Agregar ítem'
          style={{
            content: {
              width: '900px',
              margin: 'auto',
              padding: '0'
            }
          }}
        >
          <div className='modalDiv'>
            <h2 className='titleModal'>Agregar ítem a inventario</h2>
          </div>
          <form className='modalForm' onSubmit={AddItem}>
            <section className='firstBlock'>
              <TextField
                id='standard-basic'
                label='Nombre comercial'
                variant='standard'
                sx={{ width: '48%' }}
                name='comercialName'
                value={newItem.comercialName}
                onChange={handleNewItemChange}
              />
              <TextField
                id='standard-basic'
                label='Componente principal'
                variant='standard'
                sx={{ width: '48%' }}
                name='principalComponent'
                value={newItem.principalComponent}
                onChange={handleNewItemChange}
              />
              <TextField
                id='standard-basic'
                label='Componente secundario'
                variant='standard'
                sx={{ width: '48%' }}
                name='secondaryComponent'
                value={newItem.secondaryComponent}
                onChange={handleNewItemChange}
              />
            </section>
            <section className='secondBlock'>
              <FormControl sx={{ width: '48%' }}>
                <InputLabel id='demo-simple-select-label'>Clasificación</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={newItem.Clasiffication}
                  label='Clasificación'
                  name='Clasiffication'
                  onChange={handleNewItemChange}
                >
                  {
                    renderClasifications()
                  }
                </Select>
              </FormControl>
              <TextField
                sx={{ width: '48%' }}
                id='standard-basic-presentation'
                label='Presentación'
                variant='standard'
                name='Presentation'
                value={newItem.Presentation}
                onChange={handleNewItemChange}
              />
            </section>
            <div className='stateAndBlock'>
              <section className='thirdBlock'>
                <TextField
                  id='standard-basic'
                  label='Lote'
                  variant='standard'
                  fullWidth
                  name='lot'
                  value={newItem.lote}
                  onChange={handleNewItemChange}
                />
                <article className='inputDate'>
                  <InputLabel id='demo-simple-select-label'>Vencimiento</InputLabel>
                  <TextField
                    fullWidth
                    id='standard-basic'
                    variant='standard'
                    type='date'
                    name='expDate'
                    value={newItem.expDate}
                    onChange={handleNewItemChange}
                  />
                </article>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>Unidad</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={newItem.unit}
                    label='Unidad'
                    name='unit'
                    onChange={handleNewItemChange}
                  >
                    {
                      renderUnits()
                    }
                  </Select>
                </FormControl>
              </section>
              <section className='stateSection'>
                <article>
                  <img src={box} alt='box' />
                  <p>Estado</p>
                </article>
                <article>
                  <img src={vacio} alt='vacío' />
                  <p>N/A</p>
                </article>
              </section>
            </div>
            <section className='fourthBlock'>
              <FormControl sx={{ width: '48%' }}>
                <InputLabel id='demo-simple-select-label-unit'>Casa Farmaceutica</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={newItem.farmacehouse}
                  label='Casa farmaceutica'
                  name='farmacehouse'
                  onChange={handleNewItemChange}
                >
                  {
                    renderFarmacehouses()
                  }
                </Select>
              </FormControl>
              <TextField
                id='standard-basic'
                label='Precio unitario'
                variant='standard'
                sx={{ width: '48%' }}
                name='price'
                value={newItem.price}
                onChange={handleNewItemChange}
              />
              <TextField
                id='standard-basic'
                label='Cantidad'
                variant='standard'
                sx={{ width: '48%' }}
                name='quantity'
                value={newItem.quantity}
                onChange={handleNewItemChange}
              />
              <FormControl sx={{ width: '48%' }}>
                <InputLabel id='demo-simple-select-label-shelf'>Estantes disponibles</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={newItem.shelf}
                  label='Estantes disponibles'
                  name='shelf'
                  onChange={handleNewItemChange}
                >
                  {
                    renderShelfs()
                  }
                </Select>
              </FormControl>
            </section>
            <div className='itemsContainerFooter'>
              <GeneralButton event={() => AddItem()}>Añadir</GeneralButton>
              <GeneralButton event={() => setModalIsOpen(false)}>Cancelar</GeneralButton>
            </div>
          </form>
        </Modal>
        <Modal
          isOpen={providerModalIsOpen}
          onRequestClose={() => setProviderModalIsOpen(false)}
          contentLabel='Lista de proveedores'
          style={{
            content: {
              width: '700px',
              margin: 'auto',
              padding: '0'
            }
          }}
        >
          <div className='modalDiv'>
            <h2 className='titleModal'>Lista de proveedores</h2>
          </div>
          <form className='modalForm'>
            <div className='treeDiv'>
              <SimpleTreeView>
                {providers.map((provider) => (
                  <TreeItem key={provider.id_proveedor} itemId={`provider-${provider.id_proveedor}`} label={provider.nombre_proveedor}>
                    <TreeItem itemId={`provider-${provider.id_proveedor}-name`} label={`Nombre proveedor: ${provider.nombre_proveedor}`} />
                    <TreeItem itemId={`provider-${provider.id_proveedor}-address`} label={`Dirección legal: ${provider.direccion_legal}`} />
                    <TreeItem itemId={`provider-${provider.id_proveedor}-branch`} label={`Dirección sucursal: ${provider.direccion_sucursal}`} />
                    <TreeItem itemId={`provider-${provider.id_proveedor}-contact`} label={`Contacto: ${provider.contacto}`} />
                    <TreeItem itemId={`provider-${provider.id_proveedor}-localContact`} label={`Contacto local: ${provider.contacto_local}`} />
                    <TreeItem itemId={`provider-${provider.id_proveedor}-mobileContact`} label={`Contacto móvil: ${provider.contacto_movil}`} />
                    <TreeItem itemId={`provider-${provider.id_proveedor}-emails`} label={`Correos: ${provider.correo_1}, ${provider.correo_2 || ''}`} />
                    <TreeItem itemId={`provider-${provider.id_proveedor}-legalRep`} label={`Representante legal: ${provider.representante_legal}`} />
                    <TreeItem itemId={`provider-${provider.id_proveedor}-nit`} label={`NIT: ${provider.nit}`} />
                    <TreeItem itemId={`provider-${provider.id_proveedor}-ncr`} label={`NRC: ${provider.ncr}`} />
                    <TreeItem itemId={`provider-${provider.id_proveedor}-edit`} label={
                      <span onClick={() => editProvider(provider.id_proveedor)} className="editProviderBtn">
                        Editar proveedor
                      </span>
                    } className='editProviderBtn' />
                    <TreeItem itemId={`provider-${provider.id_proveedor}-delete`} label={
                      <span onClick={() => deleteOneProvider(provider.id_proveedor)} className="deleteProviderBtn">
                        Eliminar proveedor
                      </span>
                    } className='deleteProviderBtn' />
                  </TreeItem>
                ))}
              </SimpleTreeView>
            </div>
            <div className='itemsContainerFooter'>
              <GeneralButton event={nav}>Agregar</GeneralButton>
              <GeneralButton event={() => setProviderModalIsOpen(false)}>Salir</GeneralButton>
            </div>
          </form>
        </Modal>
      </div>
      <ToastContainer />
    </div>
  );
}

export default InventoryComponent