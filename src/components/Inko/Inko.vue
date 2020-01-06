<template>
  <section id="editor" class="container pb-6">
    <div class="inko-wrapper" :class="[fullscreen ? '-fullscreen' : null]">
      <InkoToolBar
        :mode="mode"
        @modeChange="(selectedMode) => mode = selectedMode"
        @reset="reset()"
        @importFile="importFile"
      />
      <div class="inko" :class="[`-${mode}-mode`]">
        <!-- Tooltips -->
        <ul class="inko-tooltips">
          <li title="Enter fullscreen mode" @click="fullscreen = !fullscreen">
            <i v-html="$octicons['screen-full'].toSVG()" v-if="!fullscreen"></i>
            <i v-html="$octicons['x'].toSVG()" v-if="fullscreen"></i>
          </li>
        </ul>

        <!-- Editor -->
        <div class="inko-editor">
          <div>
            <!-- TODO: Add line number -->
            <!-- <textarea class="inko-editor-line" v-model="lineNumber"></textarea> -->
            <textarea
              v-model="content"
              class="inko-editor-textarea"
              @keydown.tab.prevent="addTab($event)"
            ></textarea>
          </div>
        </div>

        <!-- Content Preview -->
        <div class="inko-content">
          <div class="markdown-body" v-html="renderedContent"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script type="ts">
// Default Markdown Content
import defaultContent from '../../assets/default.md'

// Components
import InkoToolBar from './InkoToolBar'

// Vue
import Component from 'vue-class-component'
import { Vue, Prop, Watch } from 'vue-property-decorator'

// Marked
import marked from 'marked'

@Component({
  components: {
    InkoToolBar
  }
})
export default class Inko extends Vue {
  // Data
  content = '';
  lineNumber = '';
  fullscreen = false;
  mode = 'split';

  // Compute
  get renderedContent () {
    return marked(this.content)
  }

  // Watch
  @Watch('content')
  function (newVal, oldVal) {
    localStorage.storedContent = newVal

    // TODO: Add line number feature
    // Get linenumber
    // let lineNumber = newVal.split("\n").map((val, index) => index + 1);
    // this.lineNumber = lineNumber.join("\n");
  }

  // Methods
  reset () {
    this.content = ''
  }

  handleScroll (e) {
    // TODO: Add line number feature
    let [line] = document.getElementsByClassName('inko-editor-line')
    line.scroll(0, e.target.scrollTop)
  }

  addTab (e) {
    // Prevent default tab behavior
    e.preventDefault()

    // Get cursor's start and end point
    let start = this.content.slice(0, event.target.selectionStart)
    let end = this.content.slice(event.target.selectionStart)

    // Assign new content mixed with tab
    this.content = `${start}  ${end}`
    e.target.selectionEnd = e.target.selectionStart + 1
  }

  importFile (e) {
    // Create reader var from FileReader class for reading the .md file content
    const reader = new FileReader()

    // Assign functions for each FileReader hooks
    reader.onload = event => {
      this.content = event.target.result
    }
    reader.onerror = error => reject(error)

    // Read file
    reader.readAsText(e.target.files[0])
  }

  // Lifecycles

  created () {
    // TODO: Add line number feature
    // let [ textarea ] = document.getElementsByClassName('inko-editor-textarea');
    // let [ line ] = document.getElementsByClassName('inko-editor-line');
    // console.log(textarea, line)
    // textarea.addEventListener('scroll', this.handleScroll)
    // window.addEventListener('scroll', this.handleScroll);
  }

  // destroyed() {
  //   window.removeEventListener("scroll", this.handleScroll);
  // }

  async mounted () {
    // Check if there is a storedContent
    if (!localStorage.storedContent) {
      // If not then load default content
      this.content = defaultContent
    } else {
      // If exists then load the previous content
      this.content = localStorage.storedContent
    }
  }
}
</script>

<style lang="scss">
#editor {
  flex: 1;
  box-sizing: border-box;
}

// * Wrapper

.inko-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.07);
  border-radius: 6px;
  overflow: hidden;
  line-height: 0;

  &.-fullscreen {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100vw;
    height: 100vh;
    border-radius: 0;
    overflow: hidden;

    @media screen and (max-width: 720px) {
      display: flex;
      flex-direction: column;

      > .inko {
        flex: 1 !important;
        display: flex;
        flex-direction: column;

        > .inko-editor,
        > .inko-content {
          flex: 1 50%;
          height: auto !important;
        }
      }
    }
  }

  @media screen and (max-width: 720px) {
    height: auto;
  }
}

// * Inko

.inko {
  flex: 1;
  width: 100%;
  height: 100%;
  background: #fff;
  overflow: hidden;
  position: relative;

  > div {
    flex: 1 50%;
  }

  &.-edit-mode {
    transition: 0.4s;

    .inko-editor {
      width: 100%;
      z-index: 10;
      transition: 0.4s;
      // transition: 0.4s;
    }

    @media screen and (max-width: 720px) {
      height: auto;

      .inko-content {
        display: none;
        opacity: 0;
        visibility: hidden;
        transition: 0.4s;
      }
    }
  }

  &.-preview-mode {
    transition: 0.4s;

    .inko-content {
      width: 100%;
      z-index: 10;
      transition: 0.4s;
      // transition: 0.4s;
    }

    @media screen and (max-width: 720px) {
      height: auto;

      .inko-editor {
        display: none;
        opacity: 0;
        visibility: hidden;
        transition: 0.4s;
      }
    }
  }

  // * Tooltips

  .inko-tooltips {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    z-index: 20;
    list-style: none;

    li {
      padding: 2px 8px;
      border-radius: 2px;
      cursor: pointer;
      background: rgba(0, 0, 0, 0.02);
      border: 1px solid rgba(0, 0, 0, 0.05);

      &:hover {
        background: rgba(0, 0, 0, 0.05);
      }
    }
  }

  // * Editor

  .inko-editor {
    width: 50%;
    height: 100%;
    padding: 0 !important;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    // transition: 0.4s;

    @media screen and (max-width: 720px) {
      width: 100% !important;
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
      background: rgba(#282c34, 0.95);
      border: 0;
      text-align: center;
      color: rgba(#fff, 0.4);
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
      background: rgba(#282c34, 0.95);
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  // * Content

  .inko-content {
    background: #fff;
    position: absolute;
    width: 50%;
    height: 100%;
    right: 0;
    top: 0;
    overflow: hidden;
    overflow-y: scroll;
    transition: 0.4s;
    display: flex;
    flex-direction: column;

    > .markdown-body {
      padding: 32px;
      overflow: hidden;
      overflow-y: scroll;
      flex: 1;
    }

    @media screen and (max-width: 720px) {
      width: 100% !important;
      height: 60vh;
      position: relative;
    }
  }
}
</style>
