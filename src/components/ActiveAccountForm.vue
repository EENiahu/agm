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

        <form action="" class="section-right__form form">
          <div class="form__row">
            <div class="form__col">
              <div class="input">
                <input defaultValue={props.email} type="email"  placeholder="Email Address" class="input__inner"/>
              </div>
            </div>
          </div>

          <div class="form__row">
            <div class="form__col">
              <div class="input">
                <input type="text"  placeholder="Enter Verification Code" class="input__inner"/>
              </div>
            </div>
          </div>

          <div class="form__row">
            <div class="form__col">
              <button type="button" class="btn btn--primary is-plain">
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
  export default {
    name: "ActiveAccountForm"
  }
</script>
