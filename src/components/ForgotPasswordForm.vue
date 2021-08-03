<template>
  <section class="auth-page__section section-right">
    <div class="section-right__inner">
      <div class="section-right__content">
        <div class="section-right__title-wrap">
          <div class="section-right__title">
            <div class="section-right__title section-right__title--primary">Reset Password</div>
            <div>Condo Corporation</div>
          </div>

          <div v-if="successMessages" class="section-right__subtitle">
            An email will be sent with further instructions on how to reset your password if our records match an account with <strong>email@email.com</strong>. If you do not hear from us within 15 minutes, please double check that you entered the correct email address and check your spam folder.
          </div>

          <div v-else class="section-right__subtitle">
            Please enter the email address you`d like your password reset information sent to.
          </div>
        </div>

        <form v-if="!successMessages" @submit.prevent="resetPassword" :action="formAction" method="POST" class="section-right__form form">
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
              <btn-loader :disabled="disabled"
                          :show-loader="loader"
                          type="submit"
                          btn-text="Submit"
                          class="btn--primary is-plain">
              </btn-loader>
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
  import BtnLoader from "@/components/common/BtnLoader";
  import errorHandler from "@/lib/ErrorHandler";
  import apiAuth from "@/api/auth";

  export default {
    name: "ForgotPasswordForm",
    components: {
      BtnLoader
    },
    data() {
      return {
        errors: new errorHandler(),
        disabled: false,
        loader: false,

        formAction: apiAuth.getRoutes().post.passwordReset,
        successMessages: false,
        inputs: {
          Email: ""
        }
      }
    },

    methods: {
      deactivateSubmit() {
        this.disabled = true;
        this.loader = true;
      },

      activateSubmit() {
        this.disabled = false;
        this.loader = false;
      },

      resetPassword(e) {
        if (this.disabled) return;
        this.deactivateSubmit();

        apiAuth.resetPassword(new FormData(e.target))
          .then(res => {
            this.activateSubmit();
            this.successMessages = true;
          })
          .catch(err => {
            this.activateSubmit();
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
