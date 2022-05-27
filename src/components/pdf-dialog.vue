<template>
  <v-dialog :value="show" @click:outside="close">
    <div class="d-flex flex-column align-center background" ref="pages-container"></div>
  </v-dialog>
</template>
<script lang="ts">
import { Observer } from 'mobx-vue'
import { PDFPageProxy } from 'pdfjs-dist'
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api'
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import { Position } from '@/aws/models'

const DEFAULT_PAGE_ID = 'pdf-dialog-page-no'

@Observer
@Component
export default class extends Vue {
  @Ref('pages-container') container!: HTMLDivElement
  @Prop() show!: boolean
  @Prop() pdf!: Promise<PDFDocumentProxy> | null
  @Prop() position!: Position | null
  renderingPages = false

  @Watch('pdf')
  async onChangePdf(): Promise<void> {
    this.renderingPages = true
    if (!this.pdf || !this.position) {
      return
    }
    const pdf: PDFDocumentProxy = await this.pdf
    this.renderPages(pdf)
  }

  @Watch('position')
  async onChangePosition(newPosition: Position | null, oldPosition: Position | null): Promise<void> {
    if (!this.pdf || !newPosition || this.renderingPages) {
      return
    }
    const pdf: PDFDocumentProxy = await this.pdf
    if (oldPosition) await this.renderHighLight(pdf, oldPosition, false)
    this.renderHighLight(pdf, newPosition)
  }

  async renderPages(pdf: PDFDocumentProxy): Promise<void> {
    this.container.innerHTML = ''
    let pages: PDFPageProxy[] = []
    for (let pageIndex = 1; pageIndex <= pdf.numPages; pageIndex++) {
      pages.push(await pdf.getPage(pageIndex))
    }
    pages.forEach((page) => {
      const viewport = page.getViewport({ scale: 1.0 })
      const canvas = document.createElement('canvas')
      canvas.id = DEFAULT_PAGE_ID + page._pageIndex
      canvas.width = viewport.width
      canvas.height = viewport.height
      canvas.style.display = 'block'
      this.container.appendChild(canvas)
    })
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i]!
      const viewport = page.getViewport({ scale: 1.0 })
      const canvas = document.getElementById(DEFAULT_PAGE_ID + page._pageIndex) as HTMLCanvasElement
      const context = canvas.getContext('2d')!
      page.render({ canvasContext: context, viewport: viewport }).promise.then(() => {
        if (this.position && this.position.pageNo === page._pageIndex + 1) {
          this.drawHighlight(context, this.position)
          canvas.scrollIntoView()
        }
      })
    }
    this.renderingPages = false
  }

  async renderHighLight(pdf: PDFDocumentProxy, position: Position, drawHighlight = true): Promise<void> {
    const highlightedPage = await pdf.getPage(position.pageNo!)
    const viewport = highlightedPage.getViewport({ scale: 1.0 })
    const canvas = document.getElementById(DEFAULT_PAGE_ID + highlightedPage._pageIndex) as HTMLCanvasElement
    canvas.height = viewport.height
    canvas.width = viewport.width
    const context = canvas.getContext('2d')!
    highlightedPage.render({ canvasContext: context, viewport: viewport }).promise.then(() => {
      if (drawHighlight) {
        this.drawHighlight(context, position)
        canvas.scrollIntoView()
      }
    })
  }

  drawHighlight(context: any, position: Position): void {
    context.beginPath()
    context.rect(position.left!, position.top!, position.width!, position.height!)
    context.fillStyle = 'rgba(244, 138, 168, 0.5)'
    context.fill()
    context.lineWidth = 4
    context.strokeStyle = 'rgba(244, 138, 168, 1)'
    context.stroke()
  }

  close(): void {
    this.$emit('close')
  }
}
</script>
<style scoped></style>
