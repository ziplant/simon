<template lang="pug">
ul.tiles(:class="{'tiles--disabled': tilesDisabled}")
  li(
    v-for="item in tiles" 
    :key="item.id" 
    :data-id="item.id" 
    :class="[{'tiles_item--active': item.active}, `tiles_item tiles_item--${item.colorName}`]"
    @click="chooseTile"
  )
</template>

<script>
import { inject } from "vue";
export default {
  setup(props, { emit }) {
    const {
      tiles, 
      activateTile, 
      selectTile, 
      tilesDisabled, 
      round, 
      chain, 
      generateChain, 
      playChain, 
      delay, 
      nextRound, 
      reset } = inject('game');

    const chooseTile = (e) => {
      if (!selectTile(e.target.dataset.id)) {
        emit('game-end', `You lose after ${round.value} rounds!`)
      }
    };

    return {
      chooseTile,
      tiles,
      tilesDisabled,
    };
  },
};
</script>

<style lang="sass">
.tiles
  list-style: none
  padding: 0
  margin: 0
  display: grid
  grid-template-columns: 1fr 1fr
  border-radius: 50%
  overflow: hidden
  box-shadow: 0px 0px 18px -5px #000
  &--disabled
    pointer-events: none
  &_item
    opacity: 0.6
    width: 160px
    height: 160px
    border: 3px solid #dedede
    box-sizing: border-box
    @media screen and (max-width: 480px)
      width: 120px
      height: 120px
    &:hover
      box-shadow: inset 0px 0px 14px -2px #000
    &--active
      opacity: 1
      transition: .15s
      box-shadow: inset 0px 0px 8px -2px #000
    &--blue
      background-color: blue
    &--red
      background-color: red
    &--yellow
      background-color: yellow
    &--green
      background-color: green
    &:nth-child(4n-3)
      border-top-left-radius: 100%
    &:nth-child(4n-2)
      border-top-right-radius: 100%
    &:nth-child(4n-1)
      border-bottom-left-radius: 100%
    &:nth-child(4n)
      border-bottom-right-radius: 100%
</style>
