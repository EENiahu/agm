<template>
  <section class="auth-page__section section-right">
    <div class="section-right__inner">
      <div class="section-right__content">
        <div class="section-right__title-wrap">
          <div class="section-right__title">
            <div class="section-right__title section-right__title--primary">Reset Password</div>
            <div>Condo Corporation</div>
          </div>
        </div>

        <form action="" class="section-right__form form">
          <div class="form__row">
            <div class="form__col">
                <div class="input" :class="{'input__is-invalid': errors.has('Password')}">
                  <input @input="handleInput" :value="inputs.Password" type="password" name="Password" placeholder="Create Password" class="input__inner"/>
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
  import BtnLoader from "@/components/common/BtnLoader";
  import errorHandler from "@/lib/ErrorHandler";
  import apiAuth from "@/api/auth";

  export default {
    name: "ResetPasswordForm",
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

      resetPassword(e) {

      },

      handleInput(e) {
        this.inputs[e.currentTarget.name] = e.currentTarget.value;
        if (this.errors.has(e.currentTarget.name)) this.errors.clear(e.currentTarget.name);
        if (this.errors.has('Message')) this.errors.clear('Message');
      }
    }
  }
</script>
