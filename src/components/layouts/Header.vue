<template>
  <header class="header">
    <section class="header__section section-main">
      <div class="container">
        <div class="section-main__inner">
          <div class="section-main__left">
            <router-link to="/" class="section-bottom__logo-link">
              <img class="section-bottom__logo-link-img" :src="require('../../assets/logo.png')" alt="logo"/>
            </router-link>
          </div>

          <div class="section-main__right">
            <ul class="section-main__links-list">
              <li class="section-main__links-item">
                <router-link to="/" class="section-main__link">condo corporation</router-link>
              </li>

              <li class="section-main__links-item">
                <router-link to="/" class="section-main__link">corporate shareholder</router-link>
              </li>

              <li class="section-main__links-item">
                <router-link to="/" class="section-main__link">not-for-profit</router-link>
              </li>

              <li class="section-main__links-item">
                <router-link to="/" class="section-main__link">our promise</router-link>
              </li>

              <li class="section-main__links-item">
                <router-link to="/" class="section-main__link">contact us</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </header>
</template>

<script>
  export default {
    name: "Header"
  }
</script>
