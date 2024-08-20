import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import './SearchInput.css'
import lupa from '../../assets/img/lupa.png'

function SearchInput(){

    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 }]

    return(
        <div className="searchInputComponent">
            <img src={lupa} alt="lupa.png"/>
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={top100Films.map((option) => option.title)}
                renderInput={(params) => (
                <TextField
                    {...params}
                    label="Búsqueda personalizada"
                    InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    }}
                />
                )}
            />
            <button className='searchButton'>Buscar</button>
        </div>
    )
}

export default SearchInput