import React from "react";

const EmailRegisterForm = () => {
    return(
        <section className="auth-page__section section-right">
            <div className="section-right__inner">
                <div className="section-right__content">
                    <div className="section-right__title-wrap">
                        <div className="section-right__title">
                            <div className="section-right__title section-right__title--primary">Register</div>
                            <div>Condo Corporation</div>
                        </div>
                    </div>

                    <form action="" className="section-right__form form">
                        <div className="form__row">
                            <div className="form__col">
                                <div className="input">
                                    <input type="password"  placeholder="Create Password" className="input__inner"/>
                                </div>
                            </div>
                        </div>

                        <div className="form__row">
                            <div className="form__col">
                                <div className="input">
                                    <input type="password"  placeholder="Re-enter Password" className="input__inner"/>
                                </div>
                            </div>
                        </div>

                        <div className="form__row">
                            <div className="form__col">
                                <button type="button" className="btn btn--primary is-plain">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="section-right__message">
                        Go back to <a href="/" className="section-right__message-link">Log In</a> page.
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EmailRegisterForm;
