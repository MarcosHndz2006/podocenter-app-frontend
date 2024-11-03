import './StandsComponent.css'
import HeaderGeneric from '../../Generics/HeaderGeneric/HeaderGeneric'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function StandsComponent() {
    return (
        <div className='standsComponentDiv'>
            <HeaderGeneric username="@username" route="/podocenter/home">Almacenes y estanterías</HeaderGeneric>
            <section className='standsContainer'>
                
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ArrowDownwardIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography>Accordion 1</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </section>
        </div>
    )
}

export default StandsComponent