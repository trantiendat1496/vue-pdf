<template>
  <div>
    <h1 class="text-center mb-8 mt-2">三菱電機（6503：電気機器 東証一部）</h1>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <h3 class="rounded-tr-xl accent d-inline-block font-weight-light pl-3 pr-4">ESGプレスリリース</h3>
          <v-sheet :elevation="11" class="mx-auto">
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr v-for="item in desserts" :key="item.name">
                    <td>{{ item.time }}</td>
                    <td class="text-decoration-underline">
                      <span>{{ item.title }}</span>
                    </td>
                    <td>
                      <v-btn outlined color="secondary">
                        {{ item.label }}
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" class="text-right">
                      <router-link to="">全て参照</router-link>
                    </td>
                  </tr>
                </tfoot>
              </template>
            </v-simple-table>
          </v-sheet>
        </v-col>
        <v-col cols="12" sm="6">
          <h3 class="rounded-tr-xl accent d-inline-block font-weight-light pl-3 pr-4">開示レポート</h3>
          <v-sheet :elevation="11" class="mx-auto">
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td>2020/02/21</td>
                    <td class="text-decoration-underline">
                      <span>アニュアルレポート 2019</span>
                    </td>
                  </tr>
                  <tr>
                    <td>2020/02/21</td>
                    <td class="text-decoration-underline">
                      <v-dialog v-model="dialog1" width="500">
                        <template v-slot:activator="{ on, attrs }">
                          <a v-bind="attrs" v-on="on"> 三菱電機グループCSRレポート 2019 </a>
                        </template>
                        <v-card>
                          <v-img src="@/assets/images/Picture1.png"></v-img>
                        </v-card>
                      </v-dialog>
                    </td>
                  </tr>
                  <tr>
                    <td>2020/02/21</td>
                    <td class="text-decoration-underline"><span>アニュアルレポート 2019</span></td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" class="text-right">
                      <router-link to="">全て参照</router-link>
                    </td>
                  </tr>
                </tfoot>
              </template>
            </v-simple-table>
          </v-sheet>
        </v-col>
        <v-col cols="12" sm="6">
          <h3 class="rounded-tr-xl accent d-inline-block font-weight-light pl-3 pr-4">不祥事ニュース</h3>
          <v-sheet :elevation="11" class="mx-auto">
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td>2020/02/21</td>
                    <td class="text-decoration-underline">アニュアルレポート 2019</td>
                    <td>
                      <v-btn outlined color="secondary"> <span>情報漏洩</span> </v-btn>
                    </td>
                  </tr>
                  <tr>
                    <td>2020/02/21</td>
                    <td class="text-decoration-underline">
                      <v-dialog v-model="dialog2" width="500">
                        <template v-slot:activator="{ on, attrs }">
                          <a v-bind="attrs" v-on="on"> 不正アクセスによる個人情報と企業機密の流出可能性 </a>
                        </template>

                        <v-card>
                          <v-img src="@/assets/images/Picture3.png"></v-img>
                        </v-card>
                      </v-dialog>
                    </td>
                    <td>
                      <v-btn outlined color="secondary"> 労務問題 </v-btn>
                    </td>
                  </tr>
                  <tr>
                    <td>2020/02/21</td>
                    <td class="text-decoration-underline"><span>アニュアルレポート 2019</span></td>
                    <td>
                      <v-btn outlined color="secondary"> 労務問題 </v-btn>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" class="text-right">
                      <router-link to="">全て参照</router-link>
                    </td>
                  </tr>
                </tfoot>
              </template>
            </v-simple-table>
          </v-sheet>
        </v-col>
        <v-col cols="12" sm="6">
          <h3 class="rounded-tr-xl accent d-inline-block font-weight-light pl-3 pr-4">コーポレートガバナンス報告書</h3>
          <v-sheet :elevation="11" class="mx-auto">
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td>2020/02/21</td>
                    <td class="text-decoration-underline">アニュアルレポート 2019</td>
                  </tr>
                  <tr>
                    <td>2020/02/21</td>
                    <td class="text-decoration-underline">
                      <v-dialog v-model="dialog3" width="500">
                        <template v-slot:activator="{ on, attrs }">
                          <a v-bind="attrs" v-on="on"> コーポレートガバナンス報告書 </a>
                        </template>

                        <v-card>
                          <v-img src="@/assets/images/Picture2.png"></v-img>
                        </v-card>
                      </v-dialog>
                    </td>
                  </tr>
                  <tr>
                    <td>2020/02/21</td>
                    <td class="text-decoration-underline"><span>アニュアルレポート 2019</span></td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" class="text-right">
                      <router-link to="">全て参照</router-link>
                    </td>
                  </tr>
                </tfoot>
              </template>
            </v-simple-table>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class BasicInfoPage extends Vue {
  dialog1 = false
  dialog2 = false
  dialog3 = false
  desserts = [
    {
      time: '2020/02/20',
      title: '代表執行役の異動、執行役・取締役人事 及び組',
      label: '人事',
    },
    {
      time: '2020/02/20',
      title: '代表執行役の異動、執行役・取締役人事 及び組',
      label: '環境',
    },
    {
      time: '2020/02/20',
      title: '代表執行役の異動、執行役・取締役人事 及び組',
      label: '不正',
    },
  ]
}
</script>

<style scoped></style>
