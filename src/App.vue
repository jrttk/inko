<template>
  <div class="body-wrapper">
    <!-- Testing Status -->
    <Testing />

    <!-- Header -->
    <Header />

    <!-- Editor -->
    <Editor />

    <!-- Footer -->
    <!-- <Footer /> -->
  </div>
</template>

<script type="ts">
// Components
import Testing from "./components/Testing";
import Header from "./components/Header";
import Editor from "./components/Editor";
import Footer from "./components/Footer";

// Vue
import Component from "vue-class-component";
import { Vue, Prop, Watch } from "vue-property-decorator";

// Marked
import marked from "marked";

@Component({
  components: {
    Testing,
    Header,
    Editor,
    Footer
  }
})
export default class App extends Vue {}
</script>

<style lang="scss" scoped>
.body-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  max-height: 100vh;

  // @media screen and (max-width: 720px) {
  //   height: auto;
  //   max-height: none;
  //   display: block;
  // }
}
</style>