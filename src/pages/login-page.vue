<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-h1">Login Page</v-col>
      <v-col cols="12">
        <v-btn color="primary" @click="vm.login()">Login</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Provide, Vue } from 'vue-property-decorator'
import { LoginViewModel } from '../viewmodels/login-viewmodel'

@Observer
@Component({
  components: {},
})
export default class LoginPage extends Vue {
  @Provide() vm = new LoginViewModel()
}
</script>

<style scoped></style>
