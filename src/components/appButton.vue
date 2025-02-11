<script setup>
import { defineProps } from 'vue'


const props = defineProps({
    buttonText:{
        type: String,
        default: "Hozzáadás"
    },
    buttonStyle:{
        type: String,
        default: "btn btn-dark"
    },
    buttonIcon:{
        type: String,
    }
})
</script>

<template>
    <button :class="buttonStyle">
        <i v-if="buttonIcon" :class="buttonIcon"></i>
         {{ buttonText }}
    </button>
</template>

