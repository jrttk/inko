<template>
  <div class="inko-editor-tool">
    <!-- <i v-html="$octicons['octicon-eye'].toSVG()"></i> -->
    <div class="BtnGroup">
      <button
        class="btn btn-sm BtnGroup-item"
        type="button"
        :class="{ 'disabled': mode === 'split' }"
        @click="$emit('modeChange', 'split')"
      >Split View</button>
      <button
        class="btn btn-sm BtnGroup-item"
        type="button"
        :class="{ 'disabled': mode === 'edit' }"
        @click="$emit('modeChange', 'edit')"
      >Editor</button>
      <button
        class="btn btn-sm BtnGroup-item"
        type="button"
        :class="{ 'disabled': mode === 'preview' }"
        @click="$emit('modeChange', 'preview')"
      >Preview</button>
    </div>
    <div>
      <button class="btn btn-sm mr-2 btn-upload" type="button">
        Import .md
        <i v-html="$octicons['markdown'].toSVG()" class="ml-1"></i>
        <input type="file" name="markdownFile" @input="$emit('importFile', $event)" />
      </button>
      <button class="btn btn-sm btn-primary mr-2" type="button" @click="downloadMDFile">
        Export to .md
        <i v-html="$octicons['markdown'].toSVG()" class="ml-1"></i>
      </button>
      <button class="btn btn-sm btn-danger" type="button" @click="$emit('reset')">Reset</button>
    </div>
  </div>
</template>

<script lang="ts">
// Vue
import Component from "vue-class-component";
import { Vue, Prop } from "vue-property-decorator";

@Component({})
export default class InkoTool extends Vue {
  @Prop(String) readonly mode!: string;

  // Methods
  downloadMDFile() {
    let { storedContent } = localStorage;
    let element = document.createElement("a");

    element.setAttribute(
      "href",
      "data:text/markdown;charset=utf-8," + encodeURIComponent(storedContent)
    );

    element.setAttribute("download", "export.md");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}
</script>

<style lang="scss">
.inko-editor-tool {
  text-align: right;
  width: 100%;
  max-height: 100%;
  padding: 12px;
  background: #33373e;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .inko-view-button {
    i {
      svg {
        width: 13px;
        height: auto;
      }
    }
  }

  @media screen and (max-width: 560px) {
    display: flex;
    flex-direction: column-reverse;

    > div {
      display: flex;
      width: 100%;

      &:last-of-type {
        margin-bottom: 12px;
      }

      > * {
        flex: 1;
      }
    }
  }
}

.btn-upload {
  position: relative;
  cursor: pointer;

  input {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
  }
}
</style>