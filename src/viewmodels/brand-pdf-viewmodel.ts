import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.js'
import { PDFPageProxy } from 'pdfjs-dist/types/src/display/api'
import { pdfHelper } from '@/helpers/pdf.helper'
import { mockBrandCodeMasters, Report } from '@/models/brand-code-master-model'
import { action, IReactionDisposer, observable, reaction } from 'mobx'
import { asyncAction } from 'mobx-utils'

export interface Data {
  id: number
  img: string
}
export class BrandPDFViewModel {
  private readonly disposes: IReactionDisposer[] = []

  @observable mockBrandCodeMasters = mockBrandCodeMasters
  @observable _reportSelected: any = this.mockBrandCodeMasters[0].reports[0]
  @observable datas: any[] = pdfHelper.getDataReport(this._reportSelected)
  private _worker = new pdfjsLib.PDFWorker()
  currPage = 1
  numPages = 0
  thePDF: any
  pageHightLight = 0
  data: any = {}

  @observable viewport = {
    width: 0,
    height: 0,
  }

  constructor() {
    this.disposes = [
      reaction(
        () => this._reportSelected,
        () => {
          this.renderReportSelected()
        }
      ),
    ]
  }

  async renderReportThumbnail(pdfPath: string, id: number) {
    const pdf = await pdfHelper.getPdf(pdfPath)
    const page = await pdf.getPage(1)
    const viewport = page.getViewport({ scale: 1.0 })
    const newViewport = page.getViewport({ scale: 100 / viewport.height })
    const canvas = document.getElementById(`thumbnail_${id}`)! as HTMLCanvasElement
    canvas.height = newViewport.height
    canvas.width = newViewport.width
    const ctx = canvas.getContext('2d')
    await page.render({ canvasContext: ctx!, viewport: newViewport })
  }

  async renderChillReport(report: Report) {
    const pdf = await pdfHelper.getPdf(report.pdf)
    const datas = pdfHelper.getDataReport(report)
    datas.forEach(async (data: any) => {
      const pageNo = data.pageNo
      const x = data.position.left
      const y = data.position.top
      const w = data.position.width
      const h = data.position.height
      const id = data.sid
      pdfHelper.render(pdf, pageNo, x, y, w, h, id)
    })
  }

  @action reportSelectedChange(report: Report) {
    if (report.id === this._reportSelected.id) return
    this._reportSelected = report
  }

  renderReportThumbnails() {
    this.mockBrandCodeMasters.forEach((brand) => {
      brand.reports.forEach((report) => {
        this.renderReportThumbnail(report.pdf, report.id)
      })
    })
  }

  @asyncAction *renderReportSelected() {
    this.datas = pdfHelper.getDataReport(this._reportSelected)
    yield this.renderChillReport(this._reportSelected)
    this.clearPopup()
  }

  @asyncAction *highLightPdfByPosition(sid: string) {
    this.data = this.datas.find((data) => data.sid === sid)
    if (this.pageHightLight !== 0) {
      yield this.clearOldPosition(this.pageHightLight)
      this.pageHightLight = this.data.pageNo
      const page = yield this.thePDF.getPage(this.pageHightLight)
      const currHightLightCanvas: any = document.getElementById('pdfViewer' + this.pageHightLight.toString())
      const context = currHightLightCanvas.getContext('2d')
      this.drawPage(page, context, true)
      this.scrollToSelectedPosition()
      return
    }
    this.pageHightLight = this.data.pageNo
    const pdf = yield pdfHelper.getPdf(this._reportSelected.pdf)
    this.thePDF = pdf
    this.numPages = this.thePDF.numPages
    const page = yield this.thePDF.getPage(1)
    this.handlePages(page)
    this.viewport = page.getViewport({ scale: 1.0 })
  }

  @asyncAction *handlePages(page) {
    const viewport = page.getViewport({ scale: 1.0 })
    //We'll create a canvas for each page to draw it on
    const canvas = document.createElement('canvas')
    canvas.id = 'pdfViewer' + (page._pageIndex + 1).toString()
    canvas.style.display = 'block'
    const context = canvas.getContext('2d')!
    canvas.height = viewport.height
    canvas.width = viewport.width
    this.drawPage(page, context)
    //Add it to the web page
    document.getElementById('pdfViewer')!.appendChild(canvas)
    //Move to next page
    this.currPage++
    if (this.thePDF !== null && this.currPage <= this.numPages) {
      yield this.thePDF.getPage(this.currPage).then((page) => {
        this.handlePages(page)
      })
    } else {
      this.scrollToSelectedPosition()
    }
  }

  scrollToSelectedPosition() {
    document.getElementById('pdfViewer' + this.pageHightLight.toString())!.scrollIntoView()
  }

  @asyncAction *clearOldPosition(pageNum: number) {
    const currHightLightCanvas: any = document.getElementById('pdfViewer' + pageNum.toString())
    const wrapElement = document.getElementById('pdfViewer')!

    if (currHightLightCanvas && wrapElement) {
      const canvas = document.createElement('canvas')
      canvas.id = 'pdfViewer' + pageNum.toString()
      canvas.style.display = 'block'
      const context = canvas.getContext('2d')!
      canvas.height = this.viewport.height
      canvas.width = this.viewport.width
      const page = yield this.thePDF.getPage(pageNum)
      const viewport = page.getViewport({ scale: 1.0 })
      yield page.render({ canvasContext: context, viewport: viewport }).promise.then(() => {
        wrapElement.replaceChild(canvas, wrapElement.childNodes[pageNum - 1])
      })
    }
  }

  drawPage(page: PDFPageProxy, context: any, redraw = false) {
    //Draw it on the canvas
    const viewport = page.getViewport({ scale: 1.0 })
    page.render({ canvasContext: context, viewport: viewport }).promise.then(() => {
      if ((page._pageIndex + 1 === this.pageHightLight && this.data) || redraw) {
        context.beginPath()
        context.rect(
          this.data.position.left,
          this.data.position.top,
          this.data.position.width,
          this.data.position.height
        )
        context.fillStyle = 'rgba(244, 138, 168, 0.5)'
        context.fill()
        context.lineWidth = 4
        context.strokeStyle = 'rgba(244, 138, 168, 1)'
        context.stroke()
      }
    })
  }

  clearPopup() {
    const pdfWrap = document.getElementById('pdfViewer')
    if (pdfWrap) {
      pdfWrap.innerHTML = ''
    }
    this.currPage = 1
    this.numPages = 0
    this.thePDF = null
    this.pageHightLight = 0
    this.data = {}

    this.viewport = {
      width: 0,
      height: 0,
    }
  }

  destroy() {
    this.disposes.forEach((r) => r())
  }
}
