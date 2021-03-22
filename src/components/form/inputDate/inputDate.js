import React from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';
import "react-datepicker/dist/react-datepicker.css";
registerLocale('ru', ru);

const inputDate = (props) => {

    const { data, handler } = props;
    const handleOnChange = (e) => {
        handler(e)
    };

    return <>
        <span style={{ display: 'block' }}>
            <DatePicker
                dateFormat="dd/MM/yyy"
                // timeFormat="HH:mm" dateFormat="yyyy/MM/dd HH:mm"
                locale="ru"
                className="input"
                selected={data}
                utcOffset={0}
                onChange={handleOnChange} />
        </span>
    </>
}

export default inputDate;