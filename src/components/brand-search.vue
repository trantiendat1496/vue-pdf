<template>
  <v-autocomplete
    class="white rounded-lg"
    color="rgba(0,0,0,0.2)"
    append-icon=""
    auto-select-first
    hide-details
    hide-selected
    return-object
    dense
    solo
    flat
    outlined
    item-text="display"
    :label="label"
    prepend-inner-icon="mdi-magnify"
    :items="items"
    :search-input.sync="search"
    v-model="model"
    full-width
    menu-props="closeOnClick"
    v-click-outside="onClickOutside"
    :filter="filterBrands"
    @change="onSelectItemHandler"
  >
    <template v-slot:no-data>
      <v-list-item-group class="text-body-1 font-weight-normal">
        <v-list-item class="px-4 py-1 gray--text" @click="onSelectItemHandler([search])" v-if="!activeFilter">
          {{ search }} – Search Company, Officer, Report, Governance, and more (Global Search)
        </v-list-item>
        <v-list-item
          class="px-4 py-1 gray--text"
          v-for="({ title }, index) in categories"
          :key="index"
          @click="onSelectItemHandler([title, search])"
          ><v-icon class="mr-4 gray--text">mdi-magnify</v-icon> {{ search }} – {{ title }}
        </v-list-item>
      </v-list-item-group>
    </template>

    <template v-slot:selection="{ item, attrs, selected }">
      <v-chip
        v-if="item.type === 'filter'"
        class="p-1.5 rounded-lg white--text"
        :class="activeFilter.color"
        v-bind="attrs"
        :input-value="selected"
        @click="removeFilter(item)"
      >
        {{ activeFilter.title }}
      </v-chip>
      <span class="gray--text" v-else>{{ item.value ? item.value : item }}</span>
    </template>

    <template v-slot:item="{ item, on, attrs }" v-if="!inputFilled">
      <v-list-item-group class="gray--text">
        <v-list-item class="px-0" v-if="item.type === 'filter'" two-line v-bind="attrs" v-on="on">
          <v-list-item-content>
            <v-list-item-subtitle class="d-block">I'm looking for...</v-list-item-subtitle>
            <v-chip-group class="d-block">
              <v-chip
                v-for="val in item.value"
                :key="val.title"
                class="p-1.5 rounded-lg white--text"
                :class="val.color"
                @click="setActiveFilter(val)"
              >
                {{ val.title }}
              </v-chip>
            </v-chip-group>
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="gray--text" v-else-if="item.type === 'recent'" v-bind="attrs" v-on="on">
          <span class="mr-4"><recent-search-icon /></span>
          <v-list-item-title>{{ item.value }}</v-list-item-title>
        </v-list-item>

        <v-list-item v-else v-bind="attrs" v-on="on">
          <v-list-item-title>{{ item.display }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </template>
  </v-autocomplete>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { BrandCodeMaster } from '@/aws/models'
import { BrandSearchItemType, BrandSearchFilterValue, BrandSearchItem } from '@/models/brand-search-model'
import AFHConvert from 'ascii-fullwidth-halfwidth-convert'
import { datastoreService } from '@/services/datastore-service'
import { ZenObservable } from 'zen-observable-ts'

@Component({
  components: {
    RecentSearchIcon: () => import('../components/icons/recent-search.vue'),
  },
})
export default class BrandSearch extends Vue {
  label = '会社名、役員、銘柄コード、またはレポートで検索します。'
  brands: BrandCodeMaster[] = []
  activeFilter: BrandSearchFilterValue | null = null
  categories: BrandSearchFilterValue[] = [
    {
      title: '企業情報検索',
      color: 'deepOrange',
    },
    {
      title: '役員情報検索',
      color: 'brown',
    },
    {
      title: 'ガバナンス情報検索',
      color: 'orange',
    },
    {
      title: 'レポート情報検索',
      color: 'cyan',
    },
    {
      title: '開示レポート検索',
      color: 'deepPurple',
    },
  ]
  recentSearches = ['キーエンス', '緑谷出久']
  model: BrandSearchItemType | null = null
  search = null
  inputFilled = false
  initialItems: BrandSearchItemType = [
    { type: BrandSearchItem.FILTER, value: this.categories },
    { header: 'recent searches' },
    ...this.recentSearches.map((text) => ({ type: BrandSearchItem.RECENT, value: text })),
  ]
  get recommendationItems() {
    return this.brands.map((item) => {
      const display = item.brandCd + ' | ' + item.brandName + ' | ' + item.brandNameKana + ' | ' + item.brandShortName
      return { ...item, display }
    })
  }
  items: BrandSearchItemType = this.initialItems

  setActiveFilter(category) {
    this.activeFilter = category
  }
  removeFilter(item: any) {
    this.activeFilter = null
    if (this.model) {
      const index = this.model.indexOf(item)
      if (index >= 0) this.model.splice(index, 1)
    }
  }
  removeInitialItems() {
    this.items = this.items.filter((item) => this.initialItems.includes(item))
  }

  subscription: ZenObservable.Subscription | undefined

  mounted() {
    this.subscription = datastoreService.observeQuery(BrandCodeMaster)?.subscribe((data) => {
      this.brands = data.items.map((item) => {
        return {
          ...item,
          normalizedBrandCd: this.normalize(item.brandCd),
          normalizedBrandName: this.normalize(item.brandName),
          normalizedBrandNameKana: this.normalize(item.brandNameKana),
          normalizedBrandShortName: this.normalize(item.brandShortName),
        }
      })
    })
  }

  onSelectItemHandler(item: any) {
    this.inputFilled = !!this.search || !!this.model
    this.$emit('itemSelected', item)
    this.$nextTick(() => {
      this.model = null
    })
  }

  @Watch('search')
  onInputChange() {
    this.inputFilled = !!this.search || !!this.model
  }
  @Watch('inputFilled')
  resetItems() {
    if (this.inputFilled) {
      this.removeInitialItems()
      this.items = this.recommendationItems
    } else {
      this.items = this.initialItems
    }
  }

  onClickOutside() {
    this.inputFilled = false
  }

  filterBrands(item, queryText) {
    queryText = this.normalize(queryText)
    return (
      item.normalizedBrandCd.startsWith(queryText) ||
      item.normalizedBrandName.includes(queryText) ||
      item.normalizedBrandNameKana.includes(queryText) ||
      item.normalizedBrandShortName.includes(queryText)
    )
  }

  normalize(val: string) {
    const WidthConverter = new AFHConvert()
    return WidthConverter.toHalfWidth(val).replace(/ /g, '').toLowerCase()
  }

  destroyed() {
    if (this.subscription) this.subscription.unsubscribe()
  }
}
</script>
<style scoped>
.v-list::v-deep .v-subheader {
  font-size: 13px !important;
  padding-left: 16px !important;
}
</style>
