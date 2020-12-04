<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          <h2>NuxtVuetify - Marc Martí Mas</h2>
        </v-card-title>
        <v-card-text> Aplicació feta amb Nuxt i Vuetify. </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            href="https://github.com/marcmartimas17/nuxtVuetify/tree/master"
            target="_blank"
          >
            Enllaç al GitHub
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo,
  },
}
</script>
