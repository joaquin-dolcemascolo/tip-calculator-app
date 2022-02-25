import React from 'react';

import './styles.scss';

function Resume({ resume, onReset }) {
    const { tipAmountByPerson, totalAmountByPerson } = resume;

    const shouldDisableResetButton = tipAmountByPerson === 0 && totalAmountByPerson === 0;

    return (
        <main className="resume">

            <section className="resume__tip-amount">
                <div className="resume__info-title">
                    <p>Tip Amount</p>
                    <small>/ person</small>
                </div>
                <span className="resume__info-amount"> ${tipAmountByPerson.toFixed(2)} </span>
            </section>

            <section className="resume__total">
                <div className="resume__info-title">
                    <p>Total</p>
                    <small>/ person</small>
                </div>
                <span className="resume__info-amount"> ${totalAmountByPerson.toFixed(2)} </span>
            </section>

            <button
                className={shouldDisableResetButton ? "resume__reset-button resume__reset-button--disabled" : "resume__reset-button"}
                disabled={shouldDisableResetButton}
                onClick={() => onReset()}
            >
                RESET
            </button>

        </main>
    )
}

export default Resume;