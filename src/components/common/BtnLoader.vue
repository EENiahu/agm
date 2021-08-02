<template>
  <button @click="$emit('click', $event)" class="btn loader-btn">
        <span class="btn__content">
            <i v-if="iconClass" class="btn__icon" :class="iconClass" :style="textVisible"></i>
            <span v-if="!iconOnly" ref="btnText" class="btn__text loader-btn__text" :style="textVisible">{{ btnText }}</span>
            <span ref="btnLoader" class="loader" :style="loaderVisible">
                <span ref="btnLoader-container" class="loader__icon-container">
                    <span ref="btnLoader-icon" class="loader__icon spin" :style="iconStyle"></span>
                </span>
            </span>
        </span>
  </button>
</template>

<script>
  export default {
    name: "BtnLoader",
    props: {
      showLoader: {
        type: Boolean,
        default: false
      },

      btnText: {
        type: String,
        default: 'Submit'
      },

      iconOnly: {
        type: Boolean,
        default: false
      },

      iconClass: {
        type: String,
        default: ''
      },

      iconStyle: {
        type: String,
        default: ''
      },

      loaderSize: {
        type: String,
        default: '1.5rem'
      },
    },

    computed: {
      textVisible() { return !this.showLoader ? {opacity: 1} : {opacity: 0} },
      loaderVisible() { return this.showLoader ? {opacity: 1} : {opacity: 0} },
    },

    mounted() {
      this.setLoaderSize();
    },

    methods: {
      setLoaderSize() {
        this.$refs['btnLoader-container'].style.width = this.loaderSize;
        this.$refs['btnLoader-container'].style.height = this.loaderSize;
      }
    }
  }
</script>

<style lang="scss">
  .loader-btn {
    position: relative;

    &__text {
      transition: 0.25s;
    }
  }

  .loader {
    transition: 0.25s;
    position: absolute;
    left: 0;
    top: 0;

    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    &__icon-container {
      position: relative;
      display: inline-flex;
      vertical-align: middle;
      justify-content: center;
    }

    &__icon {
      position: absolute;
      transform: rotate(0deg);

      width: 100%;
      height: 100%;
      border: .15rem solid;
      border-left: .15rem solid transparent;
      border-radius: 50%;
    }
  }

  .spin {
    animation: rotating 1s linear infinite;
  }

  @keyframes rotating
  {
    from
    {
      transform: rotate(0deg);
    }
    to
    {
      transform: rotate(360deg);
    }
  }
</style>
