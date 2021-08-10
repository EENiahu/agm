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

        <form @submit.prevent="register" :action="formAction" method="POST" class="section-right__form form">
          <div class="form__row">
            <div class="form__col">
              <div class="input" :class="{'input__is-invalid': errors.has('FullName')}">
                <input @input="handleInput" :value="inputs.FullName" type="text" name="FullName" placeholder="Full Name" class="input__inner"/>
                <span v-if="errors.has('FullName')" v-text="errors.get('FullName')" class="input__error-message"></span>
              </div>
            </div>
          </div>

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
              <div class="input" :class="{'input__is-invalid': errors.has('ConfirmPassword')}">
                <input @input="handleInput" :value="inputs.ConfirmPassword" type="password" name="ConfirmPassword" placeholder="Re-enter Password" class="input__inner"/>
                <span v-if="errors.has('ConfirmPassword')" v-text="errors.get('ConfirmPassword')" class="input__error-message"></span>
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
  import errorHandler from '@/lib/ErrorHandler';
  import apiAuth from '@/api/auth';
  const axios = require('axios');
  import BtnLoader from '@/components/common/BtnLoader';

  export default {
    name: "RegisterForm",
    components: {
      BtnLoader
    },
    data() {
      return {
        errors: new errorHandler(),
        disabled: false,
        loading: false,

        formAction: apiAuth.getRoutes().post.registration,
        inputs: {
          FullName: "",
          Email: "",
          Password: "",
          ConfirmPassword: "",
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

      register(e) {
        if (this.disabled) return;
        this.deactivateSubmit();

        apiAuth.register(new FormData(e.target))
            .then(res => {
              this.$store.dispatch('auth/set_token', {token: res.data.accessToken})
                  .then(() => {
                    axios.get('http://31.131.21.188:7300/v1/account', {headers: {'Authorization': `Bearer ${this.$store.getters["auth/token"]}`}})
                        .then(res => {
                          this.$store.dispatch('auth/set_user', {user: res.data})
                              .then(() => {
                                if (this.$store.getters['auth/isVerified']) {
                                  this.$router.push({path: '/dashboard/profile'});
                                  location.href = '/dashboard/profile';
                                }
                                else {this.$router.push({path: '/activate'});}
                              })
                              .catch(err => {
                                this.activateSubmit();
                                console.error(err);
                              })
                        })
                        .catch(err => {
                          this.activateSubmit();
                          console.error(err)
                        })
                  })
                  .catch(err => {
                    this.activateSubmit();
                    console.error(err)
                  })
            })
            .catch(err => {
              this.activateSubmit();
              if (err.response && err.response.data.errors) {
                this.errors.record(err.response.data.errors)
              }
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
