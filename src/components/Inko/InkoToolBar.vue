<template>
  <div class="inko-editor-tool">
    <!-- <i v-html="$octicons['octicon-eye'].toSVG()"></i> -->
    <div class="BtnGroup d-flex">
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

      <div class="ml-4 d-flex flex-items-center">
        <svg class="font-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="font" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path fill="currentColor" d="M432 416h-23.41L277.88 53.69A32 32 0 0 0 247.58 32h-47.16a32 32 0 0 0-30.3 21.69L39.41 416H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-19.58l23.3-64h152.56l23.3 64H304a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM176.85 272L224 142.51 271.15 272z" class=""></path>
        </svg>
        <details class="ml-2 dropdown details-reset details-overlay d-inline-block">
          <summary class="btn btn-sm" aria-haspopup="true">
            {{ editorFontFamily }}
            <div class="dropdown-caret"></div>
          </summary>

          <ul class="dropdown-menu dropdown-menu-se">
            <li
              v-for="(fontFamily, index) in editorFontFamilies"
              :key="index"
              class="lh-default">
              <a
                class="text-left dropdown-item"
                href="#"
                @click="$emit('update:editorFontFamily', fontFamily)">
                {{ fontFamily }}
              </a>
            </li>
          </ul>
        </details>
      </div>

    </div>
    <div class="d-flex flex-items-center">
      <svg class="font-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="font" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path fill="currentColor" d="M432 416h-23.41L277.88 53.69A32 32 0 0 0 247.58 32h-47.16a32 32 0 0 0-30.3 21.69L39.41 416H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-19.58l23.3-64h152.56l23.3 64H304a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM176.85 272L224 142.51 271.15 272z" class=""></path>
      </svg>
      <details class="ml-2 mr-2 dropdown details-reset details-overlay d-inline-block">
        <summary class="btn btn-sm" aria-haspopup="true">
          {{ previewFontFamily }}
          <div class="dropdown-caret"></div>
        </summary>

        <ul class="dropdown-menu dropdown-menu-se">
          <li
            v-for="(fontFamily, index) in previewFontFamilies"
            :key="index"
            class="lh-default">
            <a
              class="text-left dropdown-item"
              href="#"
              @click="$emit('update:previewFontFamily', fontFamily)">
              {{ fontFamily }}
            </a>
          </li>
        </ul>
      </details>

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
import Component from 'vue-class-component'
import { Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class InkoTool extends Vue {
  @Prop(String) readonly mode!: string;
  @Prop(String) readonly editorFontFamily!: string;
  @Prop(String) readonly previewFontFamily!: string;
  @Prop(Array) readonly editorFontFamilies!: Array<string>;
  @Prop(Array) readonly previewFontFamilies!: Array<string>;

  // Methods
  downloadMDFile () {
    let { storedContent } = localStorage
    let element = document.createElement('a')

    element.setAttribute(
      'href',
      'data:text/markdown;charset=utf-8,' + encodeURIComponent(storedContent)
    )

    element.setAttribute('download', 'export.md')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
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

.font-icon {
  height: 12px;
}
</style>
