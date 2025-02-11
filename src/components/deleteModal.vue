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
.delete-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-dialog {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-content {
  background-color: white;
  display: flex;
  gap: 1rem;
  padding-top: 0;
  border-radius: 1rem;
  width: 30%;
  text-align: center;
}

.modal-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: black;
  color: white;
  padding: 1rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

.modal-body{
  text-align: start;
  padding: 1rem;
}

.modal-footer{
  width: 100%;
  display: flex;
  justify-content: end;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
}

.close {
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
  border: none;
  background: transparent;
}
</style>