<template lang="pug">
.simon
  h1.simon_title Simon Says
  .simon_body
    Tiles.simon_section(@game-end="setMessage")
    Menu.simon_section(:message="message" @clear-message="setMessage")
</template>

<script>
import Tiles from "./Tiles";
import Menu from "./Menu";
import useGame from "@/compositions/game";
import useMessage from "@/compositions/message";
import { ref, provide, readonly } from "vue";

export default {
  setup() {
    const game = { ...useGame() };

    provide("game", game);

    return {
      ...useMessage(),
    };
  },
  components: {
    Tiles,
    Menu,
  },
};
</script>

<style lang="sass">
.simon
  &_title
    text-align: center
    margin-bottom: 50px
  &_body
    display: flex
    justify-content: center
    align-items: center
    flex-wrap: wrap
  &_section
    margin: 10px 30px
</style>
