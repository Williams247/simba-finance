<template>
  <div>
    <div :class="[colored ? 'card colored':'card']">
      <div class="card-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    colored: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  border-radius: 10px;
}

.colored {
  background: #f7f7f7;
  border: none !important;
}
</style>
