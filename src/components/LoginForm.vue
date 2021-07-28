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

        <form @submit.prevent="login" :action="formAction" class="section-right__form form" method="POST">
          <div class="form__row">
            <div class="form__col">
              <div class="input" :class="{'input__is-invalid': errors.has('Email')}">
                <input @input="handleInput" :value="inputs.Email" type="email" name="Email" placeholder="Email Address" class="input__inner"/>
                <span v-if="errors.has('Email')" v-text="errors.get('Email')" class="input__error-message"></span>
              </div>
            </div>
          </div>

          <div class="form__row">
            <div class="form__col">
              <div class="input" :class="{'input__is-invalid': errors.has('Password')}">
                <input @input="handleInput" :value="inputs.Password" type="password" name="Password" placeholder="Password" class="input__inner"/>
                <span v-if="errors.has('Password')" v-text="errors.get('Password')" class="input__error-message"></span>
              </div>
            </div>
          </div>

          <div class="form__row">
            <div class="form__col">
              <button type="submit" class="btn btn--primary is-plain">
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
  import errorHandler from '@/lib/ErrorHandler';
  import apiAuth from '@/api/auth';

  export default {
    name: "LoginForm",
    data() {
      return {
        errors: new errorHandler(),
        formAction: apiAuth.getRoutes().post.login,
        inputs: {
          Email: '',
          Password: ''
        }
      }
    },

    methods: {
      login(e) {
        apiAuth.login(new FormData(e.target))
            .then(res => {
              console.log(res);
            })
          .catch(err => {
            if (err.response && err.response.data.errors) {
              console.log(err.response.data.errors);
              this.errors.record(err.response.data.errors)
            }
          })
      },

      handleInput(e) {
        this.inputs[e.currentTarget.name] = e.currentTarget.value;
        if (this.errors.has(e.currentTarget.name)) this.errors.clear(e.currentTarget.name);
      }
    }
  }
</script>

