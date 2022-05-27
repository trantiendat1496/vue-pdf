<template>
  <v-app>
    <router-view />
    <snack-bar></snack-bar>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { globalStore } from './stores/global-store'

@Component
export default class App extends Vue {
  mounted() {
    globalStore.router = this.$router
  }
}
</script>

<style>
.m-w-1280 {
  max-width: 1280px !important;
}
</style>
