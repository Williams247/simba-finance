<template>
    <button :disabled="loading" class="btn btn-primary w-100 py-3 fw-bold">
      <div v-if="loading">
        <ButtonLoader />
      </div>
      <div v-else>
        {{ label }}
      </div>
    </button>
</template>

<script>
import ButtonLoader from "@/components/ButtonLoader.vue";
export default {
  components: { ButtonLoader },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ""
    }
  }
}
</script>
