<template>
  <section class="auth-page__section section-right">
    <div class="section-right__inner">
      <div class="section-right__content">
        <div class="section-right__title-wrap">
          <div class="section-right__title">
            <div class="section-right__title section-right__title--primary">Reset Password</div>
            <div>Condo Corporation</div>
          </div>

          <div class="section-right__subtitle">
            Please enter the email address you`d like your password reset information sent to.
          </div>
        </div>

        <form action="" class="section-right__form form">
          <div class="form__row">
            <div class="form__col">
              <div class="input">
                <input type="email"  placeholder="Email Address" class="input__inner"/>
              </div>
            </div>
          </div>

          <div class="form__row">
            <div class="form__col">
              <button type="button" class="btn btn--primary is-plain">
                Submit
              </button>
            </div>
          </div>
        </form>

        <div class="section-right__message">
          Go back to <router-link to="/login" class="section-right__message-link">Log In</router-link> page.
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "ForgotPasswordForm"
  }
</script>
