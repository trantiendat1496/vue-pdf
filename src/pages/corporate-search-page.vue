<template>
  <v-container fluid class="m-w-1280">
    <v-row>
      <v-col cols="12">
        <v-sheet elevation="4" tile class="pa-4 ba-black-1">
          <!-- ROW 1 -->
          <v-row no-gutters class="mb-3">
            <v-col cols="2" class="ba-black-1">
              <v-card
                elevation="0"
                width="100%"
                height="100%"
                tile
                class="secondary lighten-1 d-flex justify-center align-center"
              >
                コード
              </v-card>
            </v-col>
            <v-col v-for="n in 5" :key="n" cols="2" class="ba-black-1 bl-none">
              <v-text-field solo hide-details dense flat></v-text-field>
            </v-col>
          </v-row>

          <!-- ROW 2 -->
          <v-row no-gutters class="mb-3">
            <v-col cols="2" class="ba-black-1">
              <v-card
                elevation="0"
                width="100%"
                height="100%"
                tile
                class="secondary lighten-1 d-flex justify-center align-center"
              >
                企業名
              </v-card>
            </v-col>
            <v-col v-for="n in 5" :key="n" cols="2" class="ba-black-1 bl-none">
              <v-text-field solo hide-details dense flat></v-text-field>
            </v-col>
          </v-row>

          <!-- ROW 3 -->
          <v-row no-gutters class="mb-3">
            <v-col cols="2" class="ba-black-2">
              <v-card
                elevation="0"
                width="100%"
                height="100%"
                tile
                class="secondary lighten-1 d-flex justify-center align-center"
              >
                業種
              </v-card>
            </v-col>
            <v-col cols="2" class="ba-black-2 bl-none">
              <v-text-field solo hide-details dense flat @input="vm.changeKeySearch"></v-text-field>
            </v-col>
            <v-col cols="2" class="d-flex align-center">
              <v-btn elevation="0" color="primary" width="100" outlined class="text-center ml-3 rounded-lg">
                選択
              </v-btn>
            </v-col>
          </v-row>

          <!-- ROW 4 -->
          <v-row no-gutters class="mb-3">
            <v-col cols="2" class="ba-black-2">
              <v-card
                elevation="0"
                width="100%"
                height="100%"
                tile
                class="secondary lighten-1 d-flex justify-center align-center"
              >
                ESG情報
              </v-card>
            </v-col>
            <v-col cols="2" class="ba-black-2 bl-none">
              <v-select :items="vm.items" hide-details dense solo flat></v-select>
            </v-col>
          </v-row>

          <!-- ROW 5 -->
          <v-row no-gutters>
            <v-col cols="2" class="ba-black-2">
              <v-card
                elevation="0"
                width="100%"
                height="100%"
                tile
                class="secondary lighten-1 d-flex justify-center align-center"
              >
                表示件数
              </v-card>
            </v-col>
            <v-col cols="2" class="ba-black-2 bl-none">
              <v-select :items="vm.items" hide-details dense solo flat></v-select>
            </v-col>
            <v-col cols="8" class="text-end">
              <v-btn
                elevation="0"
                color="primary"
                width="140"
                outlined
                class="text-center ml-3 rounded-lg"
                @click="vm.search()"
              >
                検索
              </v-btn>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>

      <v-col cols="12" class="text-end">
        <v-btn elevation="0" width="70" small outlined class="text-center ml-3 rounded-lg" @click="vm.prev()">
          ＜前へ
        </v-btn>
        <v-btn elevation="0" width="70" small outlined class="text-center ml-3 rounded-lg" @click="vm.next()">
          次へ＞
        </v-btn>
      </v-col>

      <v-col cols="12" md="8">
        <v-sheet elevation="4">
          <v-data-table
            :headers="headers"
            :items="vm.displayCorporations"
            item-key="id"
            class="elevation-1"
            hide-default-footer
          >
            <template v-slot:item="{ item }">
              <tr>
                <td class="text-center text-decoration-underline">{{ item.id }}</td>
                <td class="text-start text-decoration-underline">{{ item.name }}</td>
                <td class="text-center">{{ item.industry }}</td>
                <td class="text-center">{{ item.market }}</td>
                <td class="text-center">{{ item.fiscal_year | mmdd }}</td>
                <td :class="{ 'text-center': true, 'text-decoration-underline': !!item.ESG_info }">
                  {{ item.ESG_info || 'ー' }}
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-sheet>
      </v-col>

      <v-col cols="12" class="d-flex justify-space-between align-center">
        <span>銘柄通抖</span>
        <v-btn outlined>棚奈</v-btn>
      </v-col>

      <v-col cols="12">
        <v-row class="align-center">
          <v-col cols="4" md="3">銘柄刀一卞</v-col>
          <v-col cols="8" md="3">
            <v-text-field outlined hide-details dense></v-text-field>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-row class="align-center">
          <v-col cols="4" md="3">銳柄名</v-col>
          <v-col cols="8" md="3">
            <v-text-field outlined hide-details dense></v-text-field>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-row class="align-center">
          <v-col cols="4" md="3">
            <span>検索条件指定</span>
          </v-col>
          <v-col cols="8" md="3">
            <v-select :items="vm.items" hide-details dense outlined></v-select>
          </v-col>
          <v-col cols="12" md="2" class="d-flex flex-row-reverse flex-md-row">
            <v-btn outlined>銘桐梨奈柩件管理</v-btn>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-row class="align-center">
          <v-col cols="4" md="3" class="d-flex justify-space-between">
            <span>屈性</span>
            <span>梁種</span>
          </v-col>
          <v-col cols="8" md="3">
            <v-select :items="vm.items" hide-details dense outlined></v-select>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-row class="align-center">
          <v-col cols="4" md="3">
            <div class="text-end">上場市場</div>
          </v-col>
          <v-col cols="8" md="3">
            <v-select :items="vm.items" hide-details dense outlined></v-select>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-row class="align-center">
          <v-col cols="4" md="3">
            <div class="text-end">時估綜額 (百万門)</div>
          </v-col>
          <v-col cols="8" md="3" class="d-flex align-center">
            <v-text-field outlined hide-details dense class="mr-5"></v-text-field>-
            <v-text-field outlined hide-details dense class="ml-5"></v-text-field>
          </v-col>
          <v-col cols="4" md="3">
            <div class="text-end">禿買代全 (20日平均、百万門)</div>
          </v-col>
          <v-col cols="8" md="3" class="d-flex align-center">
            <v-text-field outlined hide-details dense class="mr-5"></v-text-field>-
            <v-text-field outlined hide-details dense class="ml-5"></v-text-field>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-row class="align-center">
          <v-col cols="4" md="3">
            <div>指敏探用匝分</div>
          </v-col>
          <v-col cols="8" md="3">
            <v-select :items="vm.items" hide-details dense outlined></v-select>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-row class="align-center">
          <v-col cols="4" md="3" class="d-flex justify-space-between">
            <div class="text-end">子乙二力儿指標 口</div>
            <div>炤TOPIX</div>
          </v-col>
          <v-col cols="8" md="3" class="d-flex align-center">
            <v-text-field outlined hide-details dense class="mr-5"></v-text-field>-
            <v-text-field outlined hide-details dense class="ml-5"></v-text-field>
          </v-col>
          <v-col cols="4" md="3" class="">
            <div class="text-end">ヒストリカルボラテリティ(%)</div>
          </v-col>
          <v-col cols="8" md="3" class="d-flex align-center">
            <v-text-field outlined hide-details dense class="mr-5"></v-text-field>-
            <v-text-field outlined hide-details dense class="ml-5"></v-text-field>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-row class="align-center">
          <v-col cols="4" md="3" class="d-flex justify-space-between">
            <div class="text-end">財務閭連指數口</div>
            <div class="text-end">ROE(%)</div>
          </v-col>
          <v-col cols="8" md="3" class="d-flex align-center">
            <v-text-field outlined hide-details dense class="mr-5"></v-text-field>-
            <v-text-field outlined hide-details dense class="ml-5"></v-text-field>
          </v-col>
          <v-col cols="4" md="3">
            <div class="text-end">ROA(%)</div>
          </v-col>
          <v-col cols="8" md="3" class="d-flex align-center">
            <v-text-field outlined hide-details dense class="mr-5"></v-text-field>-
            <v-text-field outlined hide-details dense class="ml-5"></v-text-field>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-row class="align-center">
          <v-col cols="4" md="3">
            <div class="text-end">EPS(門)</div>
          </v-col>
          <v-col cols="8" md="3" class="d-flex align-center">
            <v-text-field outlined hide-details dense class="mr-5"></v-text-field>-
            <v-text-field outlined hide-details dense class="ml-5"></v-text-field>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-row class="align-center">
          <v-col cols="4" md="3">
            <div class="text-end">兗上高當羯利益幸(%)</div>
          </v-col>
          <v-col cols="8" md="3" class="d-flex align-center">
            <v-text-field outlined hide-details dense class="mr-5"></v-text-field>-
            <v-text-field outlined hide-details dense class="ml-5"></v-text-field>
          </v-col>
          <v-col cols="4" md="3">
            <div class="text-end">弦期統利益成長率(%)</div>
          </v-col>
          <v-col cols="8" md="3" class="d-flex align-center">
            <v-text-field outlined hide-details dense class="mr-5"></v-text-field>-
            <v-text-field outlined hide-details dense class="ml-5"></v-text-field>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-row class="align-center">
          <v-col cols="4" md="3" class="d-flex justify-space-between">
            <div class="text-end">市況</div>
            <div class="text-end">PER(信)</div>
          </v-col>
          <v-col cols="8" md="3" class="d-flex align-center">
            <v-text-field outlined hide-details dense class="mr-5"></v-text-field>-
            <v-text-field outlined hide-details dense class="ml-5"></v-text-field>
          </v-col>
          <v-col cols="4" md="3" class="">
            <div class="text-end">PBR(信)</div>
          </v-col>
          <v-col cols="8" md="3" class="d-flex align-center">
            <v-text-field outlined hide-details dense class="mr-5"></v-text-field>-
            <v-text-field outlined hide-details dense class="ml-5"></v-text-field>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-row class="align-center">
          <v-col cols="4" md="3">
            <div class="text-end">配当利因り(%)</div>
          </v-col>
          <v-col cols="8" md="3" class="d-flex align-center">
            <v-text-field outlined hide-details dense class="mr-5"></v-text-field>-
            <v-text-field outlined hide-details dense class="ml-5"></v-text-field>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" class="text-end">
        <v-btn outlined>棚奈</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Provide, Vue } from 'vue-property-decorator'
import { CorporateSearchViewModel } from '../viewmodels/corporate-search-viewmodel'

@Observer
@Component
export default class SearchCompany extends Vue {
  @Provide() vm = new CorporateSearchViewModel()
  headers = [
    { text: 'コード', value: 'id', sortable: false, align: 'center', width: 11, class: 'secondary lighten-1' },
    { text: '企業名', value: 'name', sortable: false, align: 'center', width: 33, class: 'secondary lighten-1' },
    { text: '業種', value: 'industry', sortable: false, align: 'center', width: 11, class: 'secondary lighten-1' },
    { text: '市場', value: 'market', sortable: false, align: 'center', width: 11, class: 'secondary lighten-1' },
    { text: '決算期', value: 'fiscal_year', sortable: false, align: 'center', width: 11, class: 'secondary lighten-1' },
    { text: 'ESG情報', value: 'ESG_info', sortable: false, align: 'center', width: 23, class: 'secondary lighten-1' },
  ]
}
</script>

<style scoped>
.ba-black-1 {
  border: 1px solid black;
}

.ba-black-2 {
  border: 2px solid black;
}

.bl-none {
  border-left: none;
}

.bl-black {
  border-left: 1px solid black;
}
</style>
