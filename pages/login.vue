<template>
  <div>
    <v-card class="mx-auto mt-5" width="600">
      <v-card-title class="ml-4 justify-center">
        <h1 class="mt-3">Login</h1>
      </v-card-title>
      <v-card-text>
        <v-form class="mx-4">
          <v-text-field label="Email" prepend-icon="mdi-account"></v-text-field>
          <v-text-field
            label="Contrassenya"
            type="password"
            prepend-icon="mdi-lock"
            append-icon="mdi-eye-off"
          >
          </v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="pb-5">
        <a href="https://laravelserver.marcmartimas.codes/register"
          ><v-btn class="secondary ml-4">Registrar-se</v-btn></a
        >
        <v-btn class="primary ml-auto mr-4">Accedir</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
