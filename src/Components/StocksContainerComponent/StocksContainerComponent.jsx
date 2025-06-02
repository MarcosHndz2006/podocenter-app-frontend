/* import de archivo .css */
import StockComponent from '../../Generics/StockComponent/StockComponent'
import './StocksContainerComponent.css'

function StocksContainerComponent(stocks) {

    const renderStocks = () => {
        let filteredStocks = stocks.stocks.filter(st => {
            return (st.existencias > 0) ? st : ''
        })

        return filteredStocks.map(st =>
            <StockComponent key={st.id_producto} props={st} />)
    }

    const renderUnavailableStocks = () => {
        let filteredStocks = stocks.stocks.filter(st => {
            return (st.existencias == 0) ? st : ''
        })

        return filteredStocks.map(st =>
            <StockComponent key={st.id_producto} props={st} />)
    }

    return (
        <div className='stocksContainerComponent'>
            <p>Disponibles</p>
            <section>
                {renderStocks()}
            </section>
            <p>No disponibles</p>
            <section>
                {renderUnavailableStocks()}
            </section>
        </div>
    )
}

export default StocksContainerComponent