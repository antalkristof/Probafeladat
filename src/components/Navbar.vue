<script setup>
import { ref, onMounted, watch } from 'vue'
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'


const props = defineProps({
  search: {
    type: Boolean,
    default: false
  },
  inputVModel: {
    type: String,
    default: ""
  }
})

const router = useRouter()
const emit = defineEmits(["update:inputVModel"]);
const searchQuery = ref(props.inputVModel);

const NavigateToProjectList = () => {
  router.push('/projectList')
}

const NavigateToProjectForm = () => {
  router.push('/projectForm')
}

const emitSearchQuery = () => {
  emit("update:inputVModel", searchQuery.value);
};

onMounted(() => {
  searchQuery.value = props.inputVModel;
});

watch(
  () => props.inputVModel,
  (newVal) => {
    searchQuery.value = newVal;
  }
);
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" @click="NavigateToProjectList">
            <a class="nav-link active" aria-current="page">Projektek listája</a>
          </li>
          <li class="nav-item" @click="NavigateToProjectForm">
            <a class="nav-link active">Új projektek hozzáadása</a>
          </li>
        </ul>
        <form v-if="search" class="d-flex" role="search">
          <input v-model="searchQuery" @input="emitSearchQuery" class="form-control me-2 search-input" type="search"
            placeholder="Search" aria-label="Search">
        </form>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  width: 100%;
  border-radius: 1rem;
  box-shadow: 3px 2px 5px 1px rgba(0, 0, 0, 0.4);
}

.navbar-nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2rem;
}

.nav-item {
  cursor: pointer;
  background: transparent;
  border-radius: 1rem;
}

.nav-item:hover {
  background: white;
}

.nav-link {
  background: transparent;
  border-radius: 1rem;
}

.nav-link:hover {
  background: white;
}

.search-input {
  border-radius: 1rem;
  width: 20rem;
}
</style>
