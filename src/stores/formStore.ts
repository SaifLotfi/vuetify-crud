import { defineStore } from "pinia";

export const useFormStore = defineStore("form", () => {
  const form = ref(null);
  const valid = ref(false);
  const firstName = ref("");
  const lastName = ref("");
  const email = ref("");
  const salary = ref<number | null>(null);
  const isEdit = ref(false);
  return { form, valid, firstName, lastName, email, salary,isEdit };
});
