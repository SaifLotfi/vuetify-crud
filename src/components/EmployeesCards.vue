<script setup lang="ts">
import { computed } from "vue";
import type { Employee } from "@/types/employee";

const props = defineProps<{
  employees: Employee[];
}>();

const employees = computed(() => {
  return props.employees;
});
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
            <v-btn>Click me</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
