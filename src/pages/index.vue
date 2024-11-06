<template>
  <Form @submit="addEmployee" />
  <EmployeesCards @delete="deleteEmployee" :employees="employees" />
</template>

<script lang="ts" setup>
import { Employee } from "@/types/employee";
import { useEmployeesStore } from "@/stores/EmployeesStore";
import { useFormStore } from "@/stores/formStore";
import { storeToRefs } from "pinia";
import axios from "axios";

const employeeStore = useEmployeesStore();
const formStore = useFormStore();

const { employees } = storeToRefs(employeeStore);

const { isEdit } = storeToRefs(formStore);

const addEmployee = (employee: Employee) => {
  if (isEdit.value) {
    const index = employees.value.findIndex((e: Employee) => e.email === employee.email);
    employees.value.splice(index, 1, employee);
    isEdit.value = false;
  } else {
    employees.value.push(employee);
  }
};

const deleteEmployee = (email: string) => {
  employees.value = employees.value.filter((e:Employee) => e.email !== email);
};

onMounted(async() => {
  try {
    const response = await axios.get("http://localhost:5000/employees");
    employees.value = response.data;
    console.log(employees.value);
  } catch (error) {
    console.log(error);
  }
});

</script>
