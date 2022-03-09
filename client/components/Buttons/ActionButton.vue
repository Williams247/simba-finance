<template>
    <button
      @click="click"
      :disabled="loading"
      :class="[variant === 'danger' ? 'btn btn-danger py-2 fw-bold':'btn btn-primary py-2 fw-bold']"
    >
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
    },
    variant: {
      type: String,
      default: "primary"
    },
    click: {
      type: Function,
      default: function() {}
    }
  }
}
</script>
