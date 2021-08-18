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
                <span v-if="errors.has('Message')" v-text="errors.get('Message')" class="input__error-message"></span>
              </div>
            </div>
          </div>

          <div class="form__row">
            <div class="form__col">
              <btn-loader :disabled="disabled"
                          :show-loader="loading"
                          type="submit"
                          btn-text="Submit"
                          class="btn--primary is-plain">
              </btn-loader>
            </div>

            <div class="form__col">
              <router-link to="/password-forgot" class="section-right__message-link">Forgot Password?</router-link>
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
  import BtnLoader from '@/components/common/BtnLoader';

  export default {
    name: "LoginForm",
    components: {
      BtnLoader
    },
    data() {
      return {
        errors: new errorHandler(),
        disabled: false,
        loading: false,

        formAction: apiAuth.getRoutes().post.login,
        inputs: {
          Email: '',
          Password: ''
        }
      }
    },

    methods: {
      deactivateSubmit() {
        this.disabled = true;
        this.loading = true;
      },

      activateSubmit() {
        this.disabled = false;
        this.loading = false;
      },

      login(e) {
        if (this.disabled) return;
        this.deactivateSubmit();

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
                              this.$router.push({path: '/dashboard'});
                              location.href = '/dashboard';
                            }
                            else {
                              this.$router.push({path: '/activate'});
                            }
                          })
                          .catch(err => {
                            this.activateSubmit();
                            console.error(err);
                          })
                    })
                    .catch(err => {
                      this.activateSubmit();
                      console.error(err);
                    })
                  })
                  .catch(err => {
                    this.activateSubmit();
                    console.error(err);
                  })
            })
            .catch(err => {
              this.activateSubmit();
              if (err.response && err.response.data.errors) this.errors.record(err.response.data.errors);
            })
      },

      handleInput(e) {
        this.inputs[e.currentTarget.name] = e.currentTarget.value;
        if (this.errors.has(e.currentTarget.name)) this.errors.clear(e.currentTarget.name);
        if (this.errors.has('Message')) this.errors.clear('Message');
      }
    }
  }
</script>

