<template>
  <section class="auth-page__section section-right">
    <div class="section-right__inner">
      <div class="section-right__content">
        <div class="section-right__title-wrap">
          <div class="section-right__title">
            <div class="section-right__title section-right__title--primary">Activate Account</div>
            <div>Condo Corporation</div>
          </div>
        </div>

        <form @submit.prevent="activate" :action="formAction" method="POST" class="section-right__form form">
          <div class="form__row">
            <div class="form__col">
              <div class="input" :class="{'input__is-invalid': errors.has('VerificationCode')}">
                <input @input="handleInput" :value="inputs.VerificationCode" type="text" name="VerificationCode" placeholder="Enter Verification Code" class="input__inner"/>
                <span v-if="errors.has('VerificationCode')" v-text="errors.get('VerificationCode')" class="input__error-message"></span>
              </div>
            </div>
          </div>

          <div class="form__row">
            <div class="form__col">
              <button type="submit" class="btn btn--primary is-plain">
                Activate Account
              </button>
            </div>
          </div>
        </form>

        <div class="section-right__message">
          <div>Your activation code has expired?</div>
          <div><button type="button" class="section-right__message-link">Click Here</button> to send a new activation code.</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import errorHandler from "@/lib/ErrorHandler";
  import apiAuth from "@/api/auth";

  export default {
    name: "ActiveAccountForm",
    data() {
      return {
        errors: new errorHandler(),
        formAction: apiAuth.getRoutes().post.checkVerificationCode,
        inputs: {
          VerificationCode: ''
        }
      }
    },

    methods: {
      activate(e) {
        let formData = new FormData();

        formData.append('Email', this.$store.getters["auth/user"].email);
        formData.append('VerificationCode', this.inputs.VerificationCode);

        apiAuth.checkVerificationCode(formData)
            .then(res => {
              this.$store.dispatch('auth/mutate_user', {
                propName: 'emailVerification',
                propValue: true
              }).then(() => {
                this.$router.push({name: 'Dashboard'});
              })
            })
            .catch(err => {
              if (err.response && err.response.data.errors) {
                this.errors.record(err.response.data.errors)
              }
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
