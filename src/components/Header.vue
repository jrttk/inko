<template>
  <section id="header" class="container -nm p-5">
    <div class="branding">
      <h1>
        <img src="../assets/images/inko-logo.svg" alt id="logo" /> inko.
      </h1>
      <span title="Label: default label" class="Label bg-blue">Beta</span>
    </div>
    <p>An online markdown editor built with Vue.js, Primer.css & Marked.js ✨</p>
    <div class="buttons">
      <a href="https://github.com/jrttk/inko" class="btn btn-sm" target="_blank" type="button">
        View source code
        <i v-html="$octicons['mark-github'].toSVG()" class="ml-1"></i>
      </a>
      <a href="https://ko-fi.com/J3J11BAQP" class="kofi">
        <img src="../assets/images/kofi.svg" alt="ko-fi" />
      </a>
    </div>
  </section>
</template>

<script>
// Vue
import Component from "vue-class-component";
import { Vue, Prop, Watch } from "vue-property-decorator";

@Component()
export default class Header extends Vue {}
</script>

<style lang="scss" scoped>
#header {
  flex: 0;
}

#logo {
  width: 32px;
  height: auto;
  display: inline-block;
  vertical-align: middle;
  margin-right: 4px;
  opacity: 0.9;
}

.branding {
  display: flex;
  align-items: center;

  img {
    margin-right: 6px;
  }

  h1 {
    display: inline-block;
    margin-right: 12px;
  }

  span {
    margin-top: 8px;
  }
}

.buttons {
  @media screen and (max-width: 560px) {
    display: flex;
    justify-content: space-between;

    > * {
      flex: 1;
      margin-left: 6px;
      margin-right: 6px;
      text-align: center;
    }
    // > * {
    //   display: block !important;
    //   width: 100%;
    //   margin-bottom: 12px;
    //   text-align: center;
    // }

    > .kofi {
      text-align: center;
      background: #ff5f5b;
      border-radius: 4px;
      margin: 0 0 !important;
    }
  }

  .kofi {
    display: inline-block;
    line-height: 0;
    vertical-align: middle;
    margin: 0 8px;

    img {
      width: auto;
      height: 28px;
      border-radius: 4px;
    }
  }
}
</style>