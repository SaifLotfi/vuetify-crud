<script setup lang="ts">
import { useFormStore } from "../stores/formStore";
import { storeToRefs } from "pinia";

const emit = defineEmits();

const store = useFormStore();

const { firstName, lastName, email, salary, valid, form, isEdit } =
  storeToRefs(store);

// Validation rules
const nameRules = [
  (value: string) => {
    if (value) return true;
    return "Name is required.";
  },
  (value: string) => {
    if (value?.length <= 10) return true;
    return "Name must be less than 10 characters.";
  },
];

const emailRules = [
  (value: string) => {
    if (value) return true;
    return "E-mail is required.";
  },
  (value: string) => {
    if (/.+@.+\..+/.test(value)) return true;
    return "E-mail must be valid.";
  },
];

const salaryRules = [
  (value: number) => {
    if (value) return true;
    return "Salary is required.";
  },
  (value: number) => {
    if (value > 0) return true;
    return "Salary should be a number greater than zero.";
  },
];

const resetForm = () => {
  valid.value = false;
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  salary.value = null;
};

const submitForm = () => {
  if (!valid.value) return;
  let newEmployee = {
    id:store.isEdit ? store.id : null,
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    salary: salary.value,
  };

  console.log(isEdit.value);
  emit("submit", newEmployee);
  //@ts-expect-error
  form.value?.reset();
  resetForm();
};

// Export the reactive properties for template usage
</script>
<template>
  <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="firstName"
            :counter="10"
            :rules="nameRules"
            label="First name"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="lastName"
            :counter="10"
            :rules="nameRules"
            label="Last name"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model.number="salary"
            :rules="salaryRules"
            label="Salary"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row justify="center">
        <v-col cols="auto">
          <v-btn class="mt-2" type="submit" @click.prevent="submitForm" block
            >Submit</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
