<template>
  <section class="auth-page__section section-right">
    <div class="section-right__inner">
      <div class="section-right__content">
        <div class="section-right__title-wrap">
          <div class="section-right__title">
            <div class="section-right__title section-right__title--primary">Register</div>
            <div>Condo Corporation</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} action="" class="section-right__form form">
          <div class="form__row">
            <div class="form__col">
              <div class="input">
                <input v-model="inputs.FullName" type="text" placeholder="Full Name" name="FullName" class="input__inner"/>
              </div>
            </div>
          </div>

          <div class="form__row">
            <div class="form__col">
              <div class="input">
                <input v-model="inputs.Email" type="email" placeholder="Email Address" name="Email" class="input__inner"/>
              </div>
            </div>
          </div>

          <div class="form__row">
            <div class="form__col">
              <div class="input">
                <input v-model="inputs.Password" type="password" placeholder="Password" name="Password" class="input__inner"/>
              </div>
            </div>
          </div>

          <div class="form__row">
            <div class="form__col">
              <div class="input">
                <input v-model="inputs.ConfirmPassword" type="password" placeholder="Re-enter Password" name="ConfirmPassword" class="input__inner"/>
              </div>
            </div>
          </div>

          <div class="form__row">
            <div class="form__col">
              <button type="submit" class="btn btn--primary is-plain">
                Submit
              </button>
            </div>
          </div>
        </form>

        <div class="section-right__message">
          Already have an account? Go back to <router-link to="/login" class="section-right__message-link">Log In</router-link> page.
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "RegisterForm",
    data() {
      return {
        inputs: {
          FullName: "",
          Email: "",
          Password: "",
          ConfirmPassword: "",
        }
      }
    }
  }
</script>
