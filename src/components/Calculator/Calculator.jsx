import React, { useEffect, useState } from 'react'
import Resume from '../Resume/Resume';
import TipSelector from '../TipSelector/TipSelector';

import { ReactComponent as DollarIcon } from "../../assets/images/icon-dollar.svg";
import { ReactComponent as PersonIcon } from "../../assets/images/icon-person.svg";

import './styles.scss';

const inputsInitialState = { billAmount: '', peopleNumber: '', selectedTip: null };
const resumeInitalState = { tipAmountByPerson: 0, totalAmountByPerson: 0 }
const errorsInitialState = { billAmount: null, peopleNumber: null }

function Calculator() {
    const [formValues, setFormValues] = useState(inputsInitialState);
    const [resume, setResume] = useState(resumeInitalState);
    const [errors, setErrors] = useState(errorsInitialState);

    const errorMessages = {
        empty: 'Must be completed',
        zero: 'Can\'t be zero or less',
    }

    const valuesGreaterThanZero = formValues.billAmount > 0 && formValues.peopleNumber > 0;
    const valuesAreNotNull = formValues.billAmount !== '' && formValues.peopleNumber !== '';
    const tipIsSelected = formValues.selectedTip !== null && formValues.selectedTip !== 'custom';

    const onTipSelected = (selectedTip) => setFormValues({ ...formValues, selectedTip });

    useEffect(() => {
        if (valuesAreNotNull && valuesGreaterThanZero && tipIsSelected) {
            calculateAmount();
        }
    }, [formValues]);

    const calculateAmount = () => {
        const tipAmount = (formValues.billAmount * formValues.selectedTip) / 100;
        const totalAmount = Number(formValues.billAmount) + tipAmount;

        setResume({
            tipAmountByPerson: tipAmount / formValues.peopleNumber,
            totalAmountByPerson: totalAmount / formValues.peopleNumber,
        });
    };

    const onReset = () => {
        setFormValues(inputsInitialState);
        setResume(resumeInitalState);
        setErrors(errorsInitialState);
    }

    const onChange = ({ target: { name, value } }) => {
        const isEmpty = !value.trim();

        switch (true) {
            case isEmpty:
                setErrors({
                    ...errors,
                    [name]: "empty"
                });
                break;
            case value <= 0:
                setErrors({
                    ...errors,
                    [name]: "zero"
                });
                break;
            default:
                setErrors({
                    ...errors,
                    [name]: null
                });
                break;
        }

        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const focusInput = (inputName) => {
        const input = document.getElementsByName(inputName)[0];
    }

    return (
        <main className="calculator">

            <section className="calculator__wrapper">
                <div role="form" className="calculator__bill">

                    <header className="calculator__header">
                        <h1>Bill</h1>
                        {errors.billAmount && <p className='calculator__error'> {errorMessages[errors.billAmount]} </p>}
                    </header>
                    <div role="textbox" className={errors.billAmount ? "calculator__input--error" : "calculator__input"} onClick={() => focusInput("billAmount")}>
                        <DollarIcon />
                        <input
                            type="number"
                            name="billAmount"
                            className={errors.billAmount && "error"}
                            value={formValues.billAmount}
                            onChange={onChange}
                            placeholder="0"
                            autoComplete="off"
                        />
                    </div>
                </div>

                <TipSelector onTipSelected={(selectedTip) => onTipSelected(selectedTip)} />

                <div role="form" className="calculator__people" onClick={() => focusInput("peopleNumber")}>

                    <header className="calculator__header">
                        <h1>Number of People</h1>
                        {errors.peopleNumber && <p className='calculator__error'> {errorMessages[errors.peopleNumber]} </p>}
                    </header>
                    <div role="textbox" className={errors.peopleNumber ? "calculator__input--error" : "calculator__input"}>
                        <PersonIcon />
                        <input
                            type="number"
                            name="peopleNumber"
                            value={formValues.peopleNumber}
                            onChange={onChange}
                            placeholder="0"
                            autoComplete="off"
                        />
                    </div>
                </div>
            </section>

            <Resume resume={resume} onReset={onReset} />

        </main>
    )
}

export default Calculator