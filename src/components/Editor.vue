<template>
  <section id="editor" class="container pb-6">
    <div class="inko-wrapper">
      <div class="inko-editor">
        <div>
          <!-- <textarea class="inko-editor-line" v-model="lineNumber"></textarea> -->
          <textarea
            v-model="content"
            class="inko-editor-textarea"
            @keydown.tab.prevent="addTab($event)"
          ></textarea>
        </div>
        <div class="inko-editor-tool">
          <button class="btn btn-sm btn-danger" type="button" @click="reset">Reset</button>
        </div>
      </div>
      <div class="inko-content markdown-body" v-html="renderedContent"></div>
    </div>
  </section>
</template>

<script type="ts">
// Default Markdown Content
import defaultContent from '../assets/default.md'

// Vue
import Component from "vue-class-component";
import { Vue, Prop, Watch } from "vue-property-decorator";

// Marked
import marked from "marked";

@Component()
export default class App extends Vue {
  // Data
  content = "";
  lineNumber = "";

  // Compute
  get renderedContent() {
    return marked(this.content);
  }

  // Watch
  @Watch("content")
  function(newVal, oldVal) {
    localStorage.storedContent = newVal;

    // TODO: Add line number feature
    // Get linenumber
    // let lineNumber = newVal.split("\n").map((val, index) => index + 1);
    // this.lineNumber = lineNumber.join("\n");
  }

  // Methods
  handleScroll(e) {
    // TODO: Add line number feature
    let [line] = document.getElementsByClassName("inko-editor-line");
    line.scroll(0, e.target.scrollTop);
  }

  addTab(e) {
    e.preventDefault();
    let start = this.content.slice(0, event.target.selectionStart);
    let end = this.content.slice(event.target.selectionStart);
    this.content = `${start}  ${end}`;
    e.target.selectionEnd = e.target.selectionStart + 1;
  }

  reset() {
    this.content = ''
  }

  // Lifecycles
  created() {
    // TODO: Add line number feature
    // let [ textarea ] = document.getElementsByClassName('inko-editor-textarea');
    // let [ line ] = document.getElementsByClassName('inko-editor-line');
    // console.log(textarea, line)
    // textarea.addEventListener('scroll', this.handleScroll)
    // window.addEventListener('scroll', this.handleScroll);
  }

  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  async mounted() {
    if(!localStorage.storedContent) {
      this.content = defaultContent
    } else {
      this.content = localStorage.storedContent;
    }
  }
}
</script>

<style lang="scss" scoped>
#editor {
  flex: 1;
  box-sizing: border-box;
}

.inko-wrapper {
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  position: relative;

  > div {
    padding: 32px;
    flex: 1 50%;
  }

  .inko-editor {
    width: 50%;
    height: 100%;
    padding: 0 !important;
    position: absolute;
    top: 0; left: 0;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 720px) {
      width: 100%;
      height: 60vh;
      position: relative;
    }

    > div {
      position: relative;

      &:first-of-type {
        flex: 1;
        display: flex;
      }
    }

    .inko-editor-line {
      overflow: hidden;
      line-height: 24px;
      width: 32px;
      height: 100%;
      resize: none;
      background: rgba(#282c34, .95);
      border: 0;
      text-align: center;
      color: rgba(#fff, .4);
      font-family: "Roboto Mono" !important;
      outline: none;
      pointer-events: none;
      font-weight: 500;
      padding-top: 12px;
      padding-bottom: 12px;
    }

    .inko-editor-textarea {
      line-height: 24px;
      padding: 12px;
      width: 100%;
      height: 100%;
      overflow: hidden;
      overflow-y: scroll;
      font-family: "Roboto Mono" !important;
      color: #fff;
      background: #282c34;
      outline: none;
      border: 0;
      resize: none;
    }

    .inko-editor-tool {
      text-align: right;
      width: 100%;
      max-height: 100%;
      padding: 12px;
      background: rgba(#282c34, .95);
      border-top: 1px solid rgba(255, 255, 255, .2);
    }
  }

  .inko-content {
    position: absolute;
    width: 50%;
    height: 100%;
    right: 0; top: 0;
    overflow: hidden;
    overflow-y: scroll;

    @media screen and (max-width: 720px) {
      width: 100%;
      height: 60vh;
      position: relative;
    }
  }
}
</style>