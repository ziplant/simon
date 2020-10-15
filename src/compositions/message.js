import { ref } from 'vue';

export default function useMessage() {
  const message = ref("");

  const setMessage = (data) => {
    message.value = data
  }

  return {
    message,
    setMessage
  }
}