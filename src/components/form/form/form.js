import React, { useState, useContext } from 'react';
import InputText from '../inputtext/inputtext';
import InputTextArea from '../inputTextArea/inputTextArea';
import InputSelected from '../inputSelected/inputSelected';
import InputDate from '../inputDate/inputDate';
import Button from '../../button/button';
import { Context } from '../../../containers/App';
import Axios from 'axios';
import { format } from 'date-fns';
import ErrorMessage from '../../message/errorMessage/errorMessage';

const Form = (props) => {

	const context = useContext(Context);
	const [loading, setLoading] = useState(false);
	const stringLimit = {
		password: 16, ctext: 4000,
		cistinf: 256, creason: 256,
		cresult: 1024, ccomment: 4000,
		cuser: 32
	};

	const onClickHandler = async () => {
		if (!context.correct) return false;
		// const endpoint = 'http://127.0.0.1:8080';
		// const endpoint = 'http://192.168.3.70';
		const endpoint = '/';
		const payload = {
			id_div: context.id_div,		// required
			ddaterisk: format(context.ddaterisk, "yyyy-MM-dd"),		// required
			ctext: context.ctext,		// required
			cistinf: context.cistinf,
			creason: context.creason,
			cresult: context.cresult,
			ccomment: context.ccomment,
			password: context.password,		// required
			cuser: context.cuser,		// required
		};
		try {
			setLoading(true);
			context.setError({ status: false });
			const { data } = await Axios.post(endpoint, payload);
			setLoading(false);
			context.setMessageRecived(true);
		} catch (e) {
			setLoading(false);
			let message = '';
			if (e.response.data.code === 123) message = e.response.data.message;
			else if (e.response.data.code === 20111) message = 'неверный пароль';
			else message = 'some error: ' + e.response.data.message;
			context.setError({ status: true, message: message });
		}

	}

	return (
		<main className="main">
			{context.error.status && <ErrorMessage message={context.error.message} />}
			<div className="row">
				<div className="form-field col-1">
					<InputSelected>наименование структурного подразделения Банка</InputSelected>
				</div>
			</div>
			<div className="row">
				<div className="form-field col-2">
					<InputText limit={stringLimit.cuser} data={context.cuser} handler={context.setCuser}>пользователь ФИО</InputText>
				</div>
				<div className="form-field col-2">
					<InputText limit={stringLimit.password} data={context.password} handler={context.setPassword} type="password">пароль</InputText>
				</div>
			</div>
			<div className="row col-1 col__right">
				<div className="form-field">
					<label className="input__label">дата возникновения риска</label>
					<InputDate data={context.ddaterisk} handler={context.setDdaterisk}></InputDate>
				</div>
			</div>
			<div className="row">
				<div className="form-field col-1">
					<InputTextArea limit={stringLimit.ctext} rows="10" data={context.ctext} handler={context.setCtext}>описание риска</InputTextArea>
				</div>
			</div>

			<div className="form-area mt-2">
				<label className="form-area__label">* - заполняется при наличии информации</label>
				<div className="row">
					<div className="form-field col-2">
						<InputTextArea limit={stringLimit.cistinf} rows="3" data={context.cistinf} handler={context.setCistinf}><span className="color-orange">*</span> источник информации о факторе риска</InputTextArea>
					</div>
					<div className="form-field col-2">
						<InputTextArea limit={stringLimit.creason} rows="3" data={context.creason} handler={context.setCreason}><span className="color-orange">*</span> фактор (причина) возникновения риска</InputTextArea>
					</div>
				</div>
				<div className="row">
					<div className="form-field col-2">
						<InputTextArea limit={stringLimit.cresult} rows="3" data={context.cresult} handler={context.setCresult}><span className="color-orange">*</span> последствия возникновения риска</InputTextArea>
					</div>
					<div className="form-field col-2">
						<InputTextArea limit={stringLimit.ccomment} rows="3" data={context.ccomment} handler={context.setCcomment}><span className="color-orange">*</span> примечание</InputTextArea>
					</div>
				</div>
			</div>
			<div className="row mt-2">
				<div className="form-field col-1">
					<div className="row col__center">
						<Button handler={onClickHandler} disabled={!context.correct} loading={loading}>ОТПРАВИТЬ В УПРАВЛЕНИЕ РИСКОВ</Button>
					</div>
				</div>
			</div>
		</main>
	)
}

export default Form;