<template>
  <div class="auth-page">
    <div class="auth-page__section-wrap">
      <section class="auth-page__section section-left">
        <div class="section-left__inner">
          <div class="section-left__content">
            <div class="section-left__title">Successful.</div>
            <div class="section-left__description">Smooth and seamless virtual meetings.</div>
          </div>
        </div>
      </section>

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Auth'
  }
</script>
