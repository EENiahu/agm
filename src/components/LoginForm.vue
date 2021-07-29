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

        <form @submit.prevent="login" :action="formAction" method="POST" class="section-right__form form">
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
                <span v-if="errors.has('message')" v-text="errors.get('message')" class="input__error-message"></span>
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
  const axios = require('axios');

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
              this.$store.dispatch('auth/set_token', {token: res.data.accessToken})
                  .then(() => {
                    axios.get('http://31.131.21.188:7300/v1/account', {
                      headers: {
                        'Authorization': `Bearer ${this.$store.getters["auth/token"]}`
                      }
                    })
                    .then(res => {
                      this.$store.dispatch('auth/set_user', {user: res.data})
                          .then(() => {
                            if (this.$store.getters['auth/isVerified']) {
                              this.$router.push({name: 'Dashboard'});
                            }
                            else {
                              this.$router.push({path: '/activate'});
                            }
                          })
                          .catch(err => {
                            console.error(err);
                          })
                    })
                    .catch(err => {
                      console.error(err);
                    })
                  })
                  .catch(err => {
                    console.error(err);
                  })
            })
            .catch(err => {
              if (err.response && err.response.data.errors) this.errors.record(err.response.data.errors);
            })
      },

      handleInput(e) {
        this.inputs[e.currentTarget.name] = e.currentTarget.value;
        if (this.errors.has(e.currentTarget.name)) this.errors.clear(e.currentTarget.name);
        if (this.errors.has('message')) this.errors.clear('message');
      }
    }
  }
</script>

