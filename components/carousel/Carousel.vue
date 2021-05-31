<template>
  <div id="carousel">
    <div class="content"
         :style="carouselStyle"
         @click="next()">
      <slot></slot>
    </div>
    <div class="controls" v-if="slideCount > 1">
      <div v-for="n in slideCount"
           v-if="showIndicator"
           @click="curSlide = n"
           class="indicator clickable"
           :key="n"
           :class="{
            'active': n === curSlide,
            'inverted': invertedIndicatorColor
           }"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    autoplay:      { type: Boolean, default: true },
    showIndicator: { type: Boolean, default: true },
    autoplayDelay: { type: Number,  default: 5000 }, // In milliseconds
    invertedIndicatorColor: { type: Boolean,  default: false }, // In milliseconds
  },
  mounted() {
    if (this.autoplay) {
      this.startTimer();
    }

    this.slideCount = this.$children
                          .filter(c => c.$el.id === 'carousel-item')
                          .length;
  },
  destroyed() {
    clearInterval(this.intervalID);
  },
  data() {
    return {
      intervalID: null,
      curSlide: 1,
      slideCount: 0
    };
  },
  methods: {
    next() {
      this.startTimer();

      this.curSlide = (this.curSlide === this.slideCount) ? 1 : this.curSlide + 1;
    },
    prev() {
      this.startTimer();

      this.curSlide = (this.curSlide === 1) ? this.slideCount : this.curSlide - 1;
    },
    startTimer() {
      if (this.intervalID !== null) {
        clearInterval(this.intervalID);
      }

      this.intervalID = setInterval(this.next, this.autoplayDelay);
    }
  },
  computed: {
    carouselStyle() {
      return {
        'margin-left': `${ (this.curSlide - 1) * -100 }%`
      };
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/vue/components/carousel.scss";
</style>
