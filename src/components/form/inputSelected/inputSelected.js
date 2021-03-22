import React, { useContext } from 'react';
import { Context } from '../../../containers/App';

const InputSelected = (props) => {

    const context = useContext(Context);
    const { id_divs, setId_div } = context;

    const handleOnChange = (e) => {
        const id_div = parseFloat(e.target.value);
        setId_div(Number.isNaN(id_div) ? undefined : id_div);
    }

    return <>
        <label className="input__label">{props.children}</label>
        <select className="input" onChange={handleOnChange}>
            {id_divs.map(item => <option key={item.ID} value={item.ID}>{`${item.CCODE} ${item.CNAME}`}</option>)};
        </select>
    </>
}

export default InputSelected;