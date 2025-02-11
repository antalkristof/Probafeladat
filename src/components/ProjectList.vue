<script setup>
import { ref, onMounted, computed } from 'vue';
import { required, minValue } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import Navbar from './navBar.vue';
import deleteModal from './deleteModal.vue';


const projects = ref([]);
const isEdited = ref([]);
const showDeleteModal = ref(null);
const searchQuery = ref("");

const openDeleteModal = (index) => {
  showDeleteModal.value = index;
};

const deleteProject = (index) => {
  projects.value.splice(index, 1);
  localStorage.setItem("projects", JSON.stringify(projects.value));
  showDeleteModal.value = null;
};

const closeDeleteModal = () => {
  showDeleteModal.value = null;
};

const editProject = (index) => {
  isEdited.value[index] = true;
};

const closeEdit = (index) => {
  isEdited.value[index] = false;
};

const saveEdit = async (index) => {
  const project = projects.value[index];
  const projectRules = {
    projectName: { required },
    description: {},
    startDate: { required },
    budget: { required, minValue: minValue(0) },
  };
  const v$ = useVuelidate(projectRules, project);

  const isFormCorrect = await v$.value.$validate();

  if (!isFormCorrect) {
    v$.value.$touch();
    return false;
  }
  isEdited.value[index] = false;
  localStorage.setItem("projects", JSON.stringify(projects.value));
};

const filteredProjects = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return projects.value.filter((project) => {
    return project.projectName.toLowerCase().includes(query);
  });
});

const formatBudget = (budget) => {
  let val = (budget/1).toFixed(2).replace(".", ",");
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const formatDate = (startDate) => {
  let val = new Date(startDate);
  return val.toLocaleDateString();
};

onMounted(() => {
  projects.value = JSON.parse(localStorage.getItem("projects")) || [];
});
</script>

<template>
  <div>
    <header>
      <Navbar :search="true" v-model:inputVModel="searchQuery" />
    </header>
    <div class="table-div">
      <table class="table table-striped">
        <thead>
          <tr class="table-header">
            <th class="left-border-radius" scope="col">#</th>
            <th scope="col">Projekt név</th>
            <th scope="col">Projekt leírás</th>
            <th scope="col">Kezdési dátum</th>
            <th scope="col">Költségvetés</th>
            <th class="right-border-radius" scope="col">Műveletek</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(project, index) in filteredProjects" :key="index" :value="index"
            :class="{ 'last-row': index === filteredProjects.length - 1 }">
            <th scope="row">{{ index + 1 }}</th>
            <td v-if="!isEdited[index]">{{ project.projectName }}</td>
            <td v-else><input type="text" class="form-control" v-model="project.projectName"></td>

            <td v-if="!isEdited[index]">{{ project.description }}</td>
            <td v-else><input type="text" class="form-control" v-model="project.description"></td>
            <td v-if="!isEdited[index]">{{ formatDate(project.startDate) }}</td>
            <td v-else><input type="date" class="form-control" v-model="project.startDate"></td>
            <td v-if="!isEdited[index]">{{ formatBudget(project.budget) }} FT</td>
            <td v-else><input class="form-control" v-model="project.budget">
            </td>
            <td>
              <button v-if="!isEdited[index]" type="button" class="edit-button"><i class="bi bi-pencil-square"
                  @click="editProject(index)"></i>
              </button>
              <button v-else type="button" class="edit-button"><i class="bi bi-floppy-fill" @click="saveEdit(index)"></i>
              </button>
              <button v-if="!isEdited[index]" type="button" class="edit-button"><i class="bi bi-trash-fill"
                  @click="openDeleteModal(index)"></i>
              </button>
              <button v-else type="button" class="edit-button">
                <i class="bi bi-x-circle" @click="closeEdit(index)"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <deleteModal 
  v-if="showDeleteModal !== null" 
  :close="closeDeleteModal"
  :deleteProject="() => deleteProject(showDeleteModal)"
  :projectName="filteredProjects[showDeleteModal].projectName"
  />
</template>

<style scoped>
.table-div {
  width: 100%;
  margin-top: 3rem;
  box-shadow: 3px 2px 5px 1px rgba(0, 0, 0, 0.4);
  border-radius: 1rem;
  border: none;
  max-height: 45rem;
  overflow-y: auto;
}

.table-header {
  position: sticky;
  top: 0;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.4);
}

td{
  max-width: 5rem;
}

.table-div::-webkit-scrollbar {
  display: none;
}

.edit-button {
  background-color: transparent;
  border: none;
  color: black;
  font-size: 1.5rem;
}

.bi-pencil-square:hover {
  color: orange;
}

.bi-trash-fill:hover,
.bi-x-circle:hover {
  color: red;
}

.bi-floppy-fill:hover {
  color: green;
}

.form-control {
  max-width: 100%;
}
</style>