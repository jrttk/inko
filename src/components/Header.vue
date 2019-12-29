<template>
  <section id="header" class="container -nm p-5">
    <div class="branding">
      <h1>
        <img src="../assets/images/inko-logo.svg" alt id="logo" /> inko.
      </h1>
      <span title="Label: default label" class="Label bg-blue">Beta</span>
    </div>
    <p>An online markdown editor built with Vue.js, Primer.css & Marked.js ✨</p>
    <button class="btn btn-sm btn-primary mr-2" type="button" @click="downloadMDFile">
      Export to .md
      <i v-html="$octicons['markdown'].toSVG()" class="ml-1"></i>
    </button>
    <button class="btn btn-sm" type="button">
      View source code
      <i v-html="$octicons['mark-github'].toSVG()" class="ml-1"></i>
    </button>
  </section>
</template>

<script>
// Vue
import Component from "vue-class-component";
import { Vue, Prop, Watch } from "vue-property-decorator";

@Component()
export default class Header extends Vue {
  downloadMDFile() {
    let { storedContent } = localStorage;

    let element = document.createElement("a");

    element.setAttribute(
      "href",
      "data:text/markdown;charset=utf-8," + encodeURIComponent(storedContent)
    );

    element.setAttribute("download", "export.md");
    element.style.display = "none";
    document.body.appendChild(element).click().removeChild(element);
  }
}
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
</style>