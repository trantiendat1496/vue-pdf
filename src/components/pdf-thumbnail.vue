<template>
  <canvas ref="thumbnail" @click="onSelectItemHandler"></canvas>
</template>
<script lang="ts">
import { pdfHelper } from '@/helpers/pdf.helper'
import { Observer } from 'mobx-vue'
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { Position } from '@/aws/models'
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api'

@Observer
@Component
export default class extends Vue {
  @Ref('thumbnail') canvas!: HTMLCanvasElement
  @Prop() index!: number
  @Prop() pdf: Promise<PDFDocumentProxy> | undefined
  @Prop() position!: Position | null

  onSelectItemHandler() {
    this.$emit('click', this.index, this.position)
  }

  mounted() {
    if (this.pdf) {
      this.pdf.then((doc) => {
        if (!this.canvas) {
          return
        }
        const pageNo = this.position?.pageNo ?? 1
        const x = this.position?.left ?? 0
        const y = this.position?.top ?? 0
        const w = this.position?.width ?? 500
        const h = this.position?.height ?? 500
        pdfHelper.render(doc, pageNo, x, y, w, h, this.canvas)
      })
    }
  }
}
</script>
<style scoped>
canvas {
  max-width: 150px;
  max-height: 200px;
  cursor: pointer;
}
</style>
