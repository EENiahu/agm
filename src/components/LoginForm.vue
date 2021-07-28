<template>
  <section class="auth-page__section section-right">
    <div class="section-right__inner">
      <div class="section-right__content">
        <div class="section-right__title-wrap">
          <div class="section-right__title">
            <div class="section-right__title section-right__title--primary">Log In</div>
            <div>Condo Corporation</div>
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
              <div class="input">
                <input type="password"  placeholder="Password" class="input__inner"/>
              </div>
            </div>
          </div>

          <div class="form__row">
            <div class="form__col">
              <button type="button" class="btn btn--primary is-plain">
                Submit
              </button>
            </div>

            <div class="form__col">
              <router-link to="/reset-password" class="section-right__message-link">Forgot Password?</router-link>
            </div>
          </div>
        </form>

        <router-link to="/register" class="btn btn--primary">Register</router-link>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "LoginForm"
  }
</script>

