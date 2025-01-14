<template>
  <div class="custom-input">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="input-field"
      placeholder="请输入搜索内容..."
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style scoped>
.custom-input {
  margin: 10px 0;
}

.input-field {
  width: 100%;
  padding: 8px 12px;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.input-field:focus {
  outline: none;
  border-color: #42b883;
}
</style>
