import React, { useEffect, useState, createContext } from 'react';
import './App.scss';
import Form from '../components/form/form/form';
import logo from '../images/logo.png';
import MessageRecived from '../components/message/messageRecived/messageRecived';
import Spinner from '../components/spinner/spinner';
import Axios from 'axios';

function App() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({ status: false });
    const [correct, setCorrect] = useState(false);
    const [messageRecived, setMessageRecived] = useState(false);


    const [id_divs, setId_divs] = useState([]);
    const [id_div, setId_div] = useState();
    const [cuser, setCuser] = useState('');
    const [password, setPassword] = useState('');
    const [ddaterisk, setDdaterisk] = useState();
    const [ctext, setCtext] = useState('');
    const [cistinf, setCistinf] = useState('');
    const [creason, setCreason] = useState('');
    const [cresult, setCresult] = useState('');
    const [ccomment, setCcomment] = useState('');
    const dataProvide = {
        error: error, setError: setError,
        id_div: id_div,
        id_divs: id_divs,
        setId_div: setId_div,
        cuser: cuser,
        setCuser: setCuser,
        password: password,
        setPassword: setPassword,
        ddaterisk: ddaterisk,
        setDdaterisk: setDdaterisk,
        correct: correct,
        ctext: ctext,
        setCtext: setCtext,
        cistinf: cistinf,
        setCistinf: setCistinf,
        creason: creason,
        setCreason: setCreason,
        cresult: cresult,
        setCresult: setCresult,
        ccomment: ccomment,
        setCcomment: setCcomment,
        setMessageRecived: setMessageRecived,
    };

    const checkCorrectData = () => {
        let ok = true;
        if (ok === !true || typeof ddaterisk === 'undefined' || ddaterisk === null || Number.isNaN(ddaterisk.getTime())) ok = false;
        if (ok === !true || typeof id_div === 'undefined') ok = false;
        if (ok === !true || !cuser.trim()) ok = false;
        if (ok === !true || !password.trim()) ok = false;
        if (ok === !true || !ctext.trim()) ok = false;
        return ok;
    }

    const getIds = async () => {
        // const endpoint = 'http://127.0.0.1:8080/ids';
        // const endpoint = 'http://192.168.3.70/ids';
        const endpoint = '/ids';
        const { data } = await Axios.get(endpoint, {
            timeout: 5000
        });

        return data.data;
    }

    // get ids for structural subdivision
    useEffect(() => {
        getIds().then(data => {
            data.unshift({ ID: null, CNAME: '', CCODE: '' });
            setId_divs(data);
            setError({ status: false });
            setLoading(false);
        }).catch(e => {
            setError({ status: true });
            setLoading(false);
        });
    }, []);

    useEffect(() => setCorrect(checkCorrectData()));

    const showDebug = () => <><h1>id_div {id_div}</h1><h1>id_div typeof  {typeof id_div}</h1><h1>cuser {cuser}</h1><h1>password: {password}</h1><h1>ddaterisk: {(typeof ddaterisk !== 'undefined' && ddaterisk !== null) && ddaterisk.toLocaleDateString()}</h1><h1>ctext {ctext}</h1><h1>cistinf {cistinf}</h1><h1>creason {creason}</h1><h1>cresult {cresult}</h1><h1>ccomment {ccomment}</h1></>

    return (
        <>
            <div className="container">
                {!true && showDebug()}
                <header className="header">
                    <img className="header__logo" src={logo} />
                    <p className="header__slogan">сообщение о проявлении риска</p>
                </header>
                {loading
                    ? <Spinner />
                    : messageRecived
                        ? <div className="row col__center"><MessageRecived handler={() => window.location.reload()} /></div>
                        : <Context.Provider value={dataProvide}><Form /></Context.Provider>
                }
            </div>
        </>
    );
}

export default App;
export const Context = createContext();