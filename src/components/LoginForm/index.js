import React from "react";

const LoginForm = () => {
    return(
        <section className="auth-page__section section-right">
            <div className="section-right__inner">
                <div className="section-right__content">
                    <div className="section-right__title-wrap">
                        <div className="section-right__title">
                            <div className="section-right__title section-right__title--primary">Log In</div>
                            <div>Condo Corporation</div>
                        </div>
                    </div>

                    <form action="" className="section-right__form form">
                        <div className="form__row">
                            <div className="form__col">
                                <div className="input">
                                    <input type="text"  placeholder="Email Address" className="input__inner"/>
                                </div>
                            </div>
                        </div>

                        <div className="form__row">
                            <div className="form__col">
                                <div className="input">
                                    <input type="password"  placeholder="Password" className="input__inner"/>
                                </div>
                            </div>
                        </div>

                        <div className="form__row">
                            <div className="form__col">
                                <button type="button" className="btn btn--primary is-plain">
                                    Submit
                                </button>
                            </div>

                            <div className="form__col">
                                <a href="/" className="section-right__message-link">Forgot Password?</a>
                            </div>
                        </div>
                    </form>

                    <button type="button" className="btn btn--primary">
                        Register
                    </button>
                </div>
            </div>
        </section>
    )
}

export default LoginForm;
