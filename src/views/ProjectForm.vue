<script setup>
import { ref } from "vue";
import { required, minValue } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import Navbar from '../components/navBar.vue';
import appButton from '../components/appButton.vue';
import inputComponent from '../components/inputComponent.vue';


const projectName = ref("");
const description = ref("");
const startDate = ref("");
const budget = ref("");

const rules = {
  projectName: { 
    required: required ,
    $autoDirty: true,
  },
  description: {},
  startDate: { 
    required: required,
    $autoDirty: true,
  },
  budget: { 
    required: required,
    minValue: minValue(0),
    $autoDirty: true,
  },
};

const v$ = useVuelidate(rules, { projectName, description, startDate, budget });

const getProjectNameErrorMessage = (validator) => {
  if (validator === "required") {
    return "A projekt nevének megadása kötelező!";
  }
  return "";
};

const getStartDateErrorMessage = (validator) => {
  if (validator === "required") {
    return "A kezdési dátum megadása kötelező!";
  }
  return "";
};

const getBudgetErrorMessage = (validator) => {
  if (validator === "required") {
    return "A költségvetés megadása kötelező!";
  }
  if (validator === "minValue") {
    return "A költségvetés nem lehet negatív vagy betű!";
  }
  return "";
};

const save = async () => {
  const isFormCorrect = await v$.value.$validate();

  if (!isFormCorrect) {
    v$.value.$touch();
    return false;
  }
  try {
    const newProject = {
      projectName: projectName.value,
      description: description.value,
      startDate: startDate.value,
      budget: budget.value,
    };

    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects.push(newProject);
    localStorage.setItem("projects", JSON.stringify(projects));
    console.log("ProjectForm saved");
    projectName.value = "";
    description.value = "";
    startDate.value = "";
    budget.value = "";
    v$.value.$reset();
  } catch (error) {
    console.error(error);
  }
  return true;
};
</script>

<template>
  <div>
    <header>
      <Navbar />
    </header>
    <form @submit.prevent="save">
      <div class="mb-3 input-div">        
        <inputComponent 
        inputId="ProjectName" 
        labelText="Project neve" 
        labelFor="ProjectName" 
        inputPlaceholder="Project neve"
        v-model="projectName"
        />
        <div v-if="v$.projectName.$error" class="text-danger">
          <div v-for="error in v$.projectName.$errors" :key="error.$uid">
            {{ getProjectNameErrorMessage(error.$validator) }}
          </div>
        </div>
      </div>
        
      <div class="mb-3 input-div">
        <label class="form-label" for="floatingTextarea">Leírás</label>
        <textarea class="form-control" id="floatingTextarea" v-model="description"></textarea>
      </div>
      
      <div class="mb-3 input-div">
        <inputComponent
        inputType="date"
        inputId="start"
        labelText="Kezdési dátum"
        labelFor="start"
        inputPlaceholder="Kezdési dátum"
        v-model="startDate"
        />
        <div v-if="v$.startDate.$error" class="text-danger">
          <div v-for="error in v$.startDate.$errors" :key="error.$uid">
            {{ getStartDateErrorMessage(error.$validator) }}
          </div>
        </div>
      </div>
      <div class="mb-3 input-div">
        <inputComponent
        inputId="budget"
        labelFor="budget"
        labelText="Költségvetés"
        inputPlaceholder="Költségvetés"
        v-model="budget"
        />
        <div v-if="v$.budget.$error" class="text-danger">
          <div v-for="error in v$.budget.$errors" :key="error.$uid">
            {{ getBudgetErrorMessage(error.$validator) }}
          </div>
        </div>
      </div>
      <appButton buttonStyle="btn btn-dark"/>
    </form>
  </div>
</template>

<style scoped>
@import url("../assets/projectForm.css");
</style>