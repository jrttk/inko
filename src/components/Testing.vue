<template>
  <section class="test-status" :class="{ '-close': close }">
    <div>
      inko is currently in beta period if you found any bug please contact me at
      <b>jirattikarn[at]mailbox[dot]org</b>
      <i v-html="$octicons.x.toSVG()" @click="close = true"></i>
    </div>
  </section>
</template>

<script>
import Component from 'vue-class-component'
import { Vue, Prop, Watch } from 'vue-property-decorator'

@Component()
export default class Testing extends Vue {
  close = false;
}
</script>

<style lang="scss">
.test-status {
  flex: 0 32px;
  font-weight: 500;
  width: 100%;
  height: 32px;
  min-height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #7c44ca;
  color: #fff;
  font-size: 12px;
  position: relative;
  transition: 0.4s;
  margin-top: 0;

  &.-close {
    margin-top: -32px;
    transition: 0.4s;
    visibility: hidden;
  }

  i {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 1rem;
    display: block;
    width: 16px;
    height: 16px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 100%;
    cursor: pointer;

    svg {
      width: 8px;
    }
  }

  @media screen and (max-width: 560px) {
    flex: 0 90px;
    min-height: 90px;
    padding-left: 48px;
    padding-right: 48px;

    &.-close {
      margin-top: -90px;
      transition: 0.4s;
    }
  }
}
</style>
