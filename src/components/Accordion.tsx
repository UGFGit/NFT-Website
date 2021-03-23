import React, { useState } from 'react';
import '../static/styles/accordion.scss';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import classNames from 'classnames';
import AnimateHeight from 'react-animate-height';

interface AccordionProps{
    title: string;
    text: string;
}

function Accordion({ title, text }: AccordionProps){
    const [open, setOpen] = useState(false);

    return(
        <div className = "accordion-root">
            <div onClick = {() => setOpen(!open)} className = 'accordion-header'>
                <p className='accordion-header-title'>{ title }</p>
                <div className = {classNames("accordion-btf", { 'accordion-btf-active':  open})}>
                    { open? <RemoveIcon style = {{fontSize: 20, color: "#FFFFFF"}}/> : <AddIcon style = {{fontSize: 20}}/> }
                </div>
            </div>
            <div className = 'accordion-body'>
                <AnimateHeight
                    duration={ 500 }
                    height={ open? 'auto' : 20 }
                >
                    <p className = "accordion-text">{text}</p>
                </AnimateHeight>
            </div>
        </div>
    )
}

export default Accordion;