<template>
  <Form @submit="addEmployee" />
  <EmployeesCards :employees="employees" />
</template>

<script lang="ts" setup>
import { Employee } from "@/types/employee";
import { ref } from "vue";

const employees = ref<Employee[]>([]);

const addEmployee = (employee: Employee) => {
  employees.value.push(employee);
};
</script>
