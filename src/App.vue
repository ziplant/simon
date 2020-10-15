<template lang="pug">
Game
</template>

<script>
import Game from "./components/Game";

export default {
  name: "App",
  components: {
    Game,
  },
};
</script>

<style lang="sass">
body
  margin: 0

#app
  min-width: 320px
  font-family: arial, sans-serif
</style>
