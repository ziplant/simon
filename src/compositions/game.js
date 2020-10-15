import { reactive, ref, watch } from "vue";

export default function useGame() {
  const tiles = reactive([
    {
      id: 1,
      colorName: "blue",
      sound: "1.ogg",
    },
    {
      id: 2,
      colorName: "red",
      sound: "2.ogg",
    },
    {
      id: 3,
      colorName: "yellow",
      sound: "3.ogg",
    },
    {
      id: 4,
      colorName: "green",
      sound: "4.ogg",
    },
  ]);

  const round = ref(0);
  const delay = ref(1000);

  watch(delay, () => reset())
  
  let activateTimerId;

  const activateTile = (id) => {
    const tile = tiles.find((el) => el.id == id);
    const sound = new Audio(require(`@/assets/media/${tile.sound}`));
    sound.play();
    tile.active = true;
    activateTimerId = setTimeout(() => {
      tile.active = false;
    }, 500);
  };
  
  let chain = reactive([]);

  const generateChain = (len) => {
    chain.length = 0;
    for (let i = 0; i < len; i++) {
      chain.push(tiles[Math.floor(Math.random() * tiles.length)].id);
    }
  };
  
  const tilesDisabled = ref(true);

  let showChainIntervalId;
  
  const playChain = (delay) => {
    let index = 0
    clearInterval(showChainIntervalId);
    tilesDisabled.value = true;
    showChainIntervalId = setInterval(() => {
      if (index >= chain.length - 1) {
        tilesDisabled.value = false;
        clearInterval(showChainIntervalId);
      }
      activateTile(chain[index]);
      index++;
    }, delay);
  };
  
  const selectTile = (id) => {
    activateTile(id);
    if (chain[0] == id) {
      chain.shift();

      if (!chain.length) {
        nextRound();
      }

      return true;
    } else {
      reset();
      
      return false;
    }
  }

  const start = () => {
    round.value = 1
    generateChain(round.value);
    playChain(delay.value);
  }
  
  const reset = () => {
    clearInterval(showChainIntervalId)
    chain.length = 0
    round.value = 0
    tilesDisabled.value = true
  }

  const nextRound = () => {
    round.value++
    generateChain(round.value)
    playChain(delay.value)
  }

  return {
    tiles,
    delay,
    round,
    activateTile,
    chain,
    generateChain,
    tilesDisabled,
    playChain,
    selectTile,
    reset,
    nextRound,
    start
  };
}
