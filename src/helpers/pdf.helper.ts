import { Report } from '@/models/brand-code-master-model'
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.js'
import { PDFPageProxy, PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api'
pdfjsLib.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.entry.js')
import { Storage } from '@aws-amplify/storage'

class PDFHelper {
  private _worker = new pdfjsLib.PDFWorker()
  private host = `${window.location.protocol}//${window.location.host}`

  constructor() {
    //
  }

  async render(pdf: any, pageNo: number, x: number, y: number, w: number, h: number, canvas: HTMLCanvasElement) {
    const page: PDFPageProxy = await pdf.getPage(pageNo)
    const viewport = page.getViewport({ scale: 1.0, offsetX: -x, offsetY: -y })
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')!
    page.render({ canvasContext: ctx, viewport: viewport })
  }

  async getPdf(url: string): Promise<PDFDocumentProxy> {
    const result = await Storage.get(`${url}`, {
      level: 'public',
    })
    return await pdfjsLib
      .getDocument({
        url: result,
        worker: this._worker,
        cMapUrl: `${this.host}/cmaps/`,
        cMapPacked: true,
      })
      .promise.then((pdf: any) => pdf)
  }

  getDataReport(report: Report) {
    return require(`../assets/data/${report.data}`)[0].hl.filter((data: any) => data.position)
  }
}

export const pdfHelper = new PDFHelper()
