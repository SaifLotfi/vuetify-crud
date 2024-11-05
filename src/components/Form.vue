<template>
  <v-form v-model="valid">
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
      </v-row>
    </v-container>
    <!-- Centering the Button -->
    <v-container>
      <v-row justify="center">
        <v-col cols="auto">
          <v-btn class="mt-2" type="submit" block>Submit</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup>
import { ref } from "vue";

// Define reactive state
const valid = ref(false);
const firstName = ref("");
const lastName = ref("");
const email = ref("");

// Validation rules
const nameRules = [
  (value) => {
    if (value) return true;
    return "Name is required.";
  },
  (value) => {
    if (value?.length <= 10) return true;
    return "Name must be less than 10 characters.";
  },
];

const emailRules = [
  (value) => {
    if (value) return true;
    return "E-mail is required.";
  },
  (value) => {
    if (/.+@.+\..+/.test(value)) return true;
    return "E-mail must be valid.";
  },
];

// Function to validate fields (optional)
const validateFields = () => {
  const nameErrors = nameRules
    .map((rule) => rule(firstname.value))
    .filter((error) => error !== true);
  const emailErrors = emailRules
    .map((rule) => rule(email.value))
    .filter((error) => error !== true);

  return {
    nameErrors,
    emailErrors,
  };
};

// Export the reactive properties for template usage
</script>
