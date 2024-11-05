import { Employee } from "@/types/employee";
import { defineStore } from "pinia";

export const useEmployeesStore = defineStore("employees", () => {
  const employees = ref<Employee[]>([]);
  return { employees };
});
