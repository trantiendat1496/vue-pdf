<template>
  <v-app>
    <amplify-authenticator>
      <amplify-sign-in slot="sign-in"></amplify-sign-in>
    </amplify-authenticator>
  </v-app>
</template>

<script lang="ts">
import { globalStore } from '@/stores/global-store'
import { onAuthUIStateChange } from '@aws-amplify/ui-components'
import { Observer } from 'mobx-vue'
import { Component, Vue } from 'vue-property-decorator'

@Observer
@Component
export default class extends Vue {
  user: any
  authState: any
  unsubscribeAuth: any
  created() {
    this.unsubscribeAuth = onAuthUIStateChange((authState, authData) => {
      this.authState = authState
      this.user = authData
      if (this.authState === 'signedin') {
        localStorage.setItem('authState', 'signedin')
        globalStore.router.push('top').catch(() => true)
      }
    })
  }

  beforeDestroy() {
    this.unsubscribeAuth()
  }
}
</script>

<style scoped></style>
