<script setup>
import { defineProps } from 'vue'
import appButton from './appButton.vue';

const props = defineProps({
    close: Function,
    deleteProject: Function,
    projectName: String
})
</script>

<template>
    <div class="delete-modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Projekt törlése</h5>
                    <appButton 
                    :buttonText="''" 
                    :buttonIcon="'bi bi-x-circle'" 
                    :buttonStyle="'close'" 
                    @click="close()"
                    />
                </div>
                <div class="modal-body">
                    <h5>
                        Biztosan törölni szeretné a "{{ projectName }}" nevű projektet?
                    </h5>
                </div>
                <div class="modal-footer">
                    <appButton 
                    :buttonText="'Törlés'" 
                    :buttonStyle="'btn btn-outline-dark'" 
                    @click="props.deleteProject()"
                    />
                    <appButton 
                    :buttonText="'Mégsem'" 
                    :buttonStyle="'btn btn-dark'" 
                    @click="props.close()"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
@import url("../assets/deleteModal.css");
</style>