import React from "react";
import { Route } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";
import ActivateAccountForm from "../../components/ActivateAccountForm";
import EmailRegisterForm from "../../components/EmailRegisterForm";
import logo from '../../img/logo.png';

const AuthPage = () => {
    return(
        <div className="wrapper">
            <header className="header">
                <section className="header__section section-main">
                    <div className="container">
                        <div className="section-main__inner">
                            <div className="section-main__left">
                                <a className="section-bottom__logo-link" href="/">
                                    <img className="section-bottom__logo-link-img" src={logo} alt="logo"/>
                                </a>
                            </div>

                            <div className="section-main__right">
                                <ul className="section-main__links-list">
                                    <li className="section-main__links-item">
                                        <a href="/" className="section-main__link">Condo Corporation</a>
                                    </li>

                                    <li className="section-main__links-item">
                                        <a href="/" className="section-main__link">corporate shareholder</a>
                                    </li>

                                    <li className="section-main__links-item">
                                        <a href="/" className="section-main__link">not-for-profit</a>
                                    </li>

                                    <li className="section-main__links-item">
                                        <a href="/" className="section-main__link">our promise</a>
                                    </li>

                                    <li className="section-main__links-item">
                                        <a href="/" className="section-main__link">contact us</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </header>

            <main className="main">
                <div className="auth-page">
                    <div className="auth-page__section-wrap">
                        <section className="auth-page__section section-left">
                            <div className="section-left__inner">
                                <div className="section-left__content">
                                    <div className="section-left__title">Successful.</div>
                                    <div className="section-left__description">Smooth and seamless virtual meetings.</div>
                                </div>
                            </div>
                        </section>

                        <Route path="/login" exact>
                            <LoginForm/>
                        </Route>

                        <Route path="/register" exact>
                            <RegisterForm/>
                        </Route>

                        <Route path="/activate-account" exact>
                            <ActivateAccountForm/>
                        </Route>

                        <Route path="/email-register" exact>
                            <EmailRegisterForm/>
                        </Route>
                    </div>
                </div>
            </main>

            <footer className="footer">
                <div className="footer__section section-main">
                    <div className="container">
                        <div className="section-main__inner">
                            <ul className="section-main__links-list">
                                <li className="section-main__links-item">
                                    <a href="/" className="section-main__link">Condo Corporation Meetings</a>
                                </li>

                                <li className="section-main__links-item">
                                    <a href="/" className="section-main__link">Corporate Shareholder Meetings</a>
                                </li>

                                <li className="section-main__links-item">
                                    <a href="/" className="section-main__link">Not-For-Profit & Association Meetings</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default AuthPage;
