<template>
  <v-app id="inspire">
    <v-navigation-drawer
      app
      v-model="mini"
      clipped
      width="96px"
      style="box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)"
    >
      <v-list nav class="py-5 text-center" flat>
        <v-list-item
          class="d-block font-weight-medium px-1 py-4"
          v-for="mainNavigation in list_navigation"
          :key="mainNavigation.title"
          link
          :to="mainNavigation.link"
          active-class="primary--text"
        >
          <template v-slot:default="{ active }">
            <div
              class="d-inline-flex px-5 py-2 rounded-pill mb-1"
              :class="{ primary: active, 'white--text': active }"
              v-if="mainNavigation.icon"
            >
              <component :is="mainNavigation.icon" style="fill: currentColor" />
            </div>
            <v-list-item-title>
              <div class="d-block text-pre-wrap p-0">
                {{ mainNavigation.title }}
              </div>
            </v-list-item-title>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="white" app clipped-left elevation="1">
      <v-container fluid class="pa-0 fill-height white--text flex-nowrap mx-n4 mx-sm-0">
        <v-app-bar-nav-icon @click.stop="mini = !mini" class="justify-sm-start d-lg-none"></v-app-bar-nav-icon>
        <v-avatar class="d-none d-sm-block mr-sm-6 mr-md-16" width="auto" rounded>
          <app-logo />
        </v-avatar>
        <v-container class="col-10 px-0 col-sm-6">
          <brand-search @itemSelected="onSelectedItem" />
        </v-container>
        <v-spacer></v-spacer>
        <v-menu offset-y bottom right>
          <template v-slot:activator="{ on, attrs }">
            <div
              class="primary--text d-inline-flex flex-nowrap ml-4 align-center justify-end col pr-2"
              v-bind="attrs"
              v-on="on"
            >
              <v-avatar class="mr-3" color="primary" size="44">
                <img src="@/assets/images/profile.png" alt="profile" />
              </v-avatar>
              <span class="mr-3 text-no-wrap text-truncate">責任投資調査部</span>
              <caret-down-icon />
            </div>
          </template>

          <v-card width="360px" class="black--text px-3 py-3">
            <v-list-item class="d-flex align-center mb-3" link>
              <v-avatar class="mr-3" color="primary" size="44">
                <img src="@/assets/images/profile.png" alt="profile" />
              </v-avatar>
              <div class="d-inline-flex flex-column">
                <span class="text-h5 font-weight-normal text-no-wrap text-truncate">責任投資調査部</span>
                <span class="primary--text text-caption font-weight-medium">Manage Your Account</span>
              </div>
            </v-list-item>
            <v-divider></v-divider>
            <v-list class="my-0">
              <v-list-item class="px-1" v-for="({ title, link }, i) in menuItems" :key="i" link :to="link">
                <v-responsive class="mr-3 lightgray" width="24px" height="24px" />
                <v-list-item-title v-text="title"></v-list-item-title>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list-item class="d-flex align-center mt-3 px-1 py-0" link v-on:click="logOut()">
              <log-out-icon class="mr-3" />
              <span>ログアウト</span>
            </v-list-item>
          </v-card>
        </v-menu>
      </v-container>
    </v-app-bar>
    <v-main app>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { globalStore } from '@/stores/global-store'
import Auth from '@aws-amplify/auth'
import { Observer } from 'mobx-vue'
import { Component, Vue } from 'vue-property-decorator'
import Icon from '@/components/icons'

@Observer
@Component({
  components: {
    BrandSearch: () => import('../components/brand-search.vue'),
    AppLogo: () => import('../components/icons/logo.vue'),
    LogOutIcon: () => import('../components/icons/exit.vue'),
    CaretDownIcon: () => import('../components/icons/caret-down.vue'),
  },
})
export default class MainContainer extends Vue {
  search = ''
  drawer = null

  logOut() {
    Auth.signOut().then(() => {
      localStorage.clear()
      globalStore.router.replace('login')
    })
  }

  mini = null
  list_navigation = [
    {
      icon: Icon.Top,
      title: 'TOP',
      link: '/top',
    },
    {
      title: '企業情報検索',
      link: '/brand',
    },
    {
      icon: Icon.Score,
      title: 'ESG\nスコア\n管理',
      link: '/esg-scoring',
    },
    {
      icon: Icon.Download,
      title: 'データ\nダウン\nロード',
      link: '/download',
    },
    {
      icon: Icon.Settings,
      title: '各種設定',
      link: '/settings-eval',
    },
  ]

  menuItems = [
    {
      title: '責任投資調査部',
      link: '/profile/change-pass',
    },
  ]
  onSelectedItem(item) {
    globalStore.router.push({ path: `/top/brand-top/${item.brandCd}` })
  }
}
</script>

<style scoped lang="scss">
.cursor-pointer {
  cursor: pointer;
}
</style>
