<template>
  <transition appear name="bottom">
    <div class="list-box">
      <div class="mask" @touchend="handleSave"></div>
      <div class="confirm" @touchend="handleSave">确定</div>
      <div class="wrapper" ref="wrapper">
        <ul class="content">
          <li v-for="(item, index) in data" :key="index" :class="{active: index === current}">
            <p v-if="typeof item === 'object'">{{ item.name }}</p>
            <p v-else>{{ item }}</p>
          </li>
        </ul>
      </div>
      <div class="abs" v-if="abs">日</div>
    </div>
  </transition>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "list",
    data() {
      return {
        current: 0
      }
    },
    props: {
      data: {
        type: Array,
        default: [],
      },
      abs: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleSave() {
        this.$emit('change', this.data ? this.data[this.scroll.getSelectedIndex()] : null);
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          bounceTime: 300,
          swipeBounceTime: 400,
          wheel: {
            selectedIndex: this.ckeck,
            wheelWrapperClass: 'wheel-scroller',
            wheelItemClass: 'wheel-item',
            rotate: 0,
          },
          observeDOM: false
        });
        this.scroll.on('scrollEnd', () => {
          this.current = this.scroll.getSelectedIndex()
        })
      })
    },
    activated() {

    }
  }
</script>

<style scoped lang="less">
  .bottom-enter-active, .bottom-leave-active {
    transition: opacity .3s, margin .3s;
  }
  .bottom-enter-active {
    opacity: 0;
    margin-bottom: -177px;
  }
  .bottom-leave-active {
    margin-bottom: 0;
    opacity: 1;
  }
  .bottom-leave-to {
    margin-bottom: -177px;
    opacity: 0;
  }
  .bottom-enter-to {
    margin-bottom: 0;
    opacity: 1;
  }
.list-box {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 176px;
  border-top: 1px solid #E3E9E6;
  .abs {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    margin-left: 46px;
    top: 50%;
    z-index: 3;
  }
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: #333;
    opacity: .4;
  }
  .confirm {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-left: auto;
    position: relative;
    padding-right: 36px;
    height: 34px;
    width: calc(100% - 36px);
    color: #25A3A8;
    border-bottom: 1px solid #E4ECE8;
    z-index: 2;
    background-color: white;
  }
  .wrapper {
    position: relative;
    width: 100%;
    height: 142px;
    overflow: hidden;
    text-align: center;
    z-index: 2;
    background-color: white;
    .content {
      margin-top: 46px;
      li.active {
        opacity: 1;
        p {
          font-size: 16px;
        }
      }
      li {
        color: #159EA4;
        opacity: .6;
        p {
          font-size: 14px;
        }
      }
      li + li {
        margin-top: 12px;
      }
    }
  }
}
</style>
