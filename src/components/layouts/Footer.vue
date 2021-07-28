<template>
  <footer class="footer">
    <section class="footer__section section-main">
      <div class="container">
        <div class="section-main__inner">
          <ul class="section-main__links-list">
            <li class="section-main__links-item">
              <router-link to="/" class="section-main__link">Condo Corporation Meetings</router-link>
            </li>

            <li class="section-main__links-item">
              <router-link to="/" class="section-main__link">Corporate Shareholder Meetings</router-link>
            </li>

            <li class="section-main__links-item">
              <router-link to="/" class="section-main__link">Not-For-Profit & Association Meetings</router-link>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="footer__section section-secondary">
      <div class="container">
        <div class="section-secondary__inner">
          <div class="section-secondary__copyright">
            ©2021 AGM ONLINE. ALL RIGHTS RESERVED.
          </div>

          <div class="section-secondary__btns">
            <button class="section-secondary__btn" type="button">Privacy Policy</button>
            <div class="section-secondary__divider">|</div>
            <button class="section-secondary__btn" type="button">Terms of Use</button>
          </div>
        </div>
      </div>
    </section>
  </footer>
</template>

<script>
  export default {
    name: "Footer"
  }
</script>
