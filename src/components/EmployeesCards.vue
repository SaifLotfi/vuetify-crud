<script setup lang="ts">
import { computed } from "vue";
import type { Employee } from "@/types/employee";
import { useFormStore } from "@/stores/formStore";
import { storeToRefs } from "pinia";

const store = useFormStore();

const props = defineProps<{
  employees: Employee[];
}>();

const emit = defineEmits<{
  (e: "delete", id: number): void;
}>();

const employees = computed(() => {
  return props.employees;
});

const deleteEmployee = (id: number) => {
  emit("delete", id);
};

const editEmployee = (employee: Employee) => {
  const { firstName, lastName, email, salary, valid,isEdit} =
    storeToRefs(store);
    firstName.value = employee.firstName;
    lastName.value = employee.lastName;
    email.value = employee.email;
    salary.value = employee.salary;
    valid.value = false;
    isEdit.value = true;
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col
        v-for="employee in employees"
        :key="employee.email"
        cols="12"
        md="4"
      >
        <v-card
          color="primary"
          variant="outlined"
          :title="employee.firstName"
          :subtitle="employee.lastName"
        >
          <v-container>
            <v-card-text> Email: {{ employee.email }} </v-card-text>
            <v-card-text> Salary: {{ employee.salary }} </v-card-text>
          </v-container>

          <v-card-actions>
            <v-btn @click="editEmployee(employee)" color="secondary"
              >Edit</v-btn
            >
            <v-btn @click="deleteEmployee(employee.id)" color="error"
              >Delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
