<template lang="pug">
.option
  label.option_item(v-for="item in difficulty" :key="item.delay")
    input.option_control(
      type="radio" 
      name="difficulty" 
      :value="item.level" 
      :checked="item.default" 
      v-model="selectedLevel"
    )
    span.option_caption {{item.title}}
</template>

<script>
import { inject, ref, reactive, watch } from "vue";

export default {
  setup() {
    const difficulty = reactive([
      {
        level: 1,
        title: "Easy",
        delay: 1500,
      },
      {
        level: 2,
        title: "Normal",
        delay: 1000,
        default: true,
      },
      {
        level: 3,
        title: "Hard",
        delay: 400,
      },
    ]);

    const selectedLevel = ref(difficulty.find(el => el.default).level)

    const { delay } = inject("game");
    
    watch(selectedLevel, (level, prevLevel) => {
      const levelInfo = difficulty.find(el => el.level == selectedLevel.value)
      if (levelInfo) {
        delay.value = levelInfo.delay
      }
    })

    return {
      difficulty,
      selectedLevel,
    };
  },
};
</script>

<style lang="sass">
.option
  display: flex
  flex-direction: column
  &_item
    margin-bottom: 5px
    display: flex
    align-items: center
  &_control
    margin: 0
    margin-right: 10px
  &_caption
</style>
