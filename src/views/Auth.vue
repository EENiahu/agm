<template>
  <div id="app" class="app">
    <div class="wrapper">
      <Header/>

      <main class="main">
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
      </main>

      <Footer/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/layouts/Header.vue'
import Footer from '@/components/layouts/Footer.vue'

  export default {
    name: 'Auth',
    components: {
      Header,
      Footer
    }
  }
</script>
