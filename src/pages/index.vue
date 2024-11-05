<template>
  <Form @submit="addEmployee" />
  <EmployeesCards @delete="deleteEmployee" :employees="employees" />
</template>

<script lang="ts" setup>
import { Employee } from "@/types/employee";
import { ref } from "vue";

const employees = ref<Employee[]>([]);

const addEmployee = (employee: Employee) => {
  employees.value.push(employee);
};

const deleteEmployee = (email: string) => {
  employees.value = employees.value.filter((e) => e.email !== email);
};

</script>
