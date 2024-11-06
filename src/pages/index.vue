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
    axios.put(`http://localhost:5000/employees/${employee.id}`, {
      ...employee,
    });
    const index = employees.value.findIndex(
      (e: Employee) => e.id === employee.id
    );
    employees.value.splice(index, 1, employee);
    isEdit.value = false;
  } else {
    try {
      axios.post("http://localhost:5000/employees", {
        ...employee,
      });

      employees.value.push(employee) 
    } catch (error) {
      console.log(error);
    }
  }
};

const deleteEmployee = (id: number) => {
  try {
    axios.delete(`http://localhost:5000/employees/${id}`);
  } catch (error) {
    console.log(error);
  }
  employees.value = employees.value.filter((e: Employee) => e.id !== id);
};

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:5000/employees");
    employees.value = response.data;
    console.log(employees.value);
  } catch (error) {
    console.log(error);
  }
});
</script>
