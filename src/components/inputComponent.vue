<script setup>
import { ref, watch, onMounted } from "vue";

const props = defineProps({
    modelValue: {
        type: String,
        default: "",
    },
    inputClass: {
        type: String,
        default: "form-control"
    },
    labelClass: {
        type: String,
        default: "form-label"
    },
    inputType: {
        type: String,
        default: "text"
    },
    inputId: {
        type: String,
        default: ""
    },
    labelText: {
        type: String,
        default: ""
    },
    labelFor: {
        type: String,
        default: ""
    },
    inputPlaceholder: {
        type: String,
        default: ""
    }
})

const emit = defineEmits(["update:modelValue"])

const internalValue = ref(props.modelValue || props.value || "") 

onMounted(() => {
    internalValue.value = props.modelValue || props.value || ""
})

watch(() => props.modelValue, (newVal) => {
    internalValue.value = newVal || ""
})

watch(() => internalValue.value, (newVal) => {
    emit("update:modelValue", newVal)
})

watch(() => props.value, (newVal) => {
    internalValue.value = newVal || ""
})

</script>

<template>
        <label v-if="labelText" :for="labelFor" :class="labelClass">{{ labelText }}</label>
        <input  
        v-model="internalValue" 
        :class="inputClass" 
        :type="inputType" 
        :id="inputId"
        :placeholder="inputPlaceholder" 
        />
</template>

<style scoped>
input {
    box-shadow: 3px 2px 5px 1px rgba(0, 0, 0, 0.4);
    border-radius: 1rem;
}

.form-label {
    font-size: medium;
    font-weight: bold;
}
</style>