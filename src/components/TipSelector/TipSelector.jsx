import React, { useEffect, useState } from 'react'

import './styles.scss';

const tipPercentages = [5, 10, 15, 25, 50, 'custom'];

function TipSelector({ onTipSelected, shouldResetTip }) {
    const [selectedTip, setSelectedTip] = useState(null);
    const [customTipValue, setCustomTipValue] = useState('');

    const [error, setError] = useState("empty");
    const errorMessages = {
        empty: 'Must be completed',
        zero: 'Can\'t be less than zero',
    }

    const shouldRenderInput = (tipValue) => tipValue === 'custom';
    const isSelected = (tipId) => tipId === selectedTip;
    const shouldRenderError = selectedTip === 'custom' && error !== null;

    useEffect(() => {
        if (isSelected('custom')) {
            error === null && onTipSelected(customTipValue);
        } else {
            onTipSelected(selectedTip);
        }
    }, [selectedTip, customTipValue]);

    useEffect(() => {
        setSelectedTip(null);
        setCustomTipValue('');
    }, [shouldResetTip]);

    const handleTipClick = (tipPercentage) => {
        if (!isSelected(tipPercentage)) {
            setSelectedTip(tipPercentage);
        }
    }

    const handleInput = ({ target: { value } }) => {
        const isEmpty = !value.trim();

        switch (true) {
            case isEmpty:
                setError('empty')
                break;
            case value < 0:
                setError("zero");
                break;
            default:
                setError(null);
                break;
        }

        setCustomTipValue(value);
    }

    const focusInput = () => {
        document.getElementsByName('customTip')[0].focus();
    }

    return (
        <section className="tip-selector">
            <h1>Select Tip %</h1>
            <section className="tip-selector__tips">
                {
                    tipPercentages.map(tipPercentage => {
                        return (
                            shouldRenderInput(tipPercentage) ?

                                <div
                                    key="custom-tip"
                                    role="textbox"
                                    onClick={() => { focusInput(); handleTipClick('custom') }}
                                    className={isSelected('custom') ? error ? "tip-selector__custom-tip--error" : "tip-selector__custom-tip--selected" : "tip-selector__custom-tip"}
                                >
                                    <input
                                        name="customTip"
                                        type="number"
                                        min="0"
                                        placeholder="Custom"
                                        autoComplete="off"
                                        value={customTipValue}
                                        onChange={handleInput}
                                    />
                                </div>

                                :

                                <button
                                    key={`tip-selector__button-${tipPercentage}`}
                                    className={isSelected(tipPercentage) ? "tip-selector__button--selected" : "tip-selector__button"}
                                    onClick={() => handleTipClick(tipPercentage)}
                                >
                                    {tipPercentage}%
                                </button>
                        )
                    })
                }
            </section>
            {shouldRenderError && <p className="tip-selector__error"> {errorMessages[error]} </p>}
        </section>
    )
}

export default TipSelector