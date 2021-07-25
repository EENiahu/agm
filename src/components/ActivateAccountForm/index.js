import React from "react";

const ActivateAccountForm = () => {
    return(
        <section className="auth-page__section section-right">
            <div className="section-right__inner">
                <div className="section-right__content">
                    <div className="section-right__title-wrap">
                        <div className="section-right__title">
                            <div className="section-right__title section-right__title--primary">Activate Account</div>
                            <div>Condo Corporation</div>
                        </div>
                    </div>

                    <form action="" className="section-right__form form">
                        <div className="form__row">
                            <div className="form__col">
                                <div className="input">
                                    <input type="text"  placeholder="Enter Verification Code" className="input__inner"/>
                                </div>
                            </div>
                        </div>

                        <div className="form__row">
                            <div className="form__col">
                                <button type="button" className="btn btn--primary is-plain">
                                    Create Account
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="section-right__message">
                        <div>Your activation code has expired.</div>
                        <div><a href="/" className="section-right__message-link">Click Here</a> to send a new activation code.</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ActivateAccountForm;
