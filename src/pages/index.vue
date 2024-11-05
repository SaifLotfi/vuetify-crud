<template>
  <Form @submit="addEmployee" />
  <EmployeesCards @delete="deleteEmployee" :employees="employees" />
</template>

<script lang="ts" setup>
import { Employee } from "@/types/employee";
import { useEmployeesStore } from "@/stores/EmployeesStore";
import { useFormStore } from "@/stores/formStore";
import { storeToRefs } from "pinia";

const employeeStore = useEmployeesStore();
const formStore = useFormStore();

const { employees } = storeToRefs(employeeStore);
const { isEdit } = storeToRefs(formStore);

const addEmployee = (employee: Employee) => {
  if(isEdit.value){
    console.log('in isEdit')
    const index = employees.value.findIndex((e) => e.email === employee.email);
    employees.value.splice(index, 1, employee);
    isEdit.value = false;
  }else {
    console.log('in pushing normally')
    employees.value.push(employee);
  }
};

const deleteEmployee = (email: string) => {
  employees.value = employees.value.filter((e) => e.email !== email);
};
</script>
