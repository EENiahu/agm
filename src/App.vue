<template>
  <div id="app" class="app">
    <div class="wrapper">
      <Header/>
      <main class="main">
        <router-view/>
      </main>
      <Footer/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/layouts/Header.vue'
import Footer from '@/components/layouts/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>
