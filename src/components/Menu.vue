<template lang="pug">
.menu
  .menu_section
    h3.menu_title Round: {{round}}
    button.menu_btn(@click="startGame()") Start
    p.menu_message {{message}}
  .menu_section
    h3.menu_title Game options:
    Difficulty
</template>

<script>
import Difficulty from "./Difficulty";
import { inject } from "vue";

export default {
  props: {
    message: String,
  },
  setup(props, { emit }) {
    const { round, start } = inject("game");

    const startGame = () => {
      start();
      emit("clear-message", "");
    };

    return {
      round,
      startGame,
    };
  },
  components: {
    Difficulty,
  },
};
</script>

<style lang="sass">
.menu
  &_section
  &_title
  &_btn
    border: none
    background-color: #2ebc4f
    color: #fff
    border-radius: 6px
    font-size: 16px
    padding: 10px 30px
    cursor: pointer
    transition-duration: .15s
    transition-property: background-color
    &:hover
      background-color: darken(#2ebc4f, 10)
  &_message
    width: 200px
    height: 20px
</style>
