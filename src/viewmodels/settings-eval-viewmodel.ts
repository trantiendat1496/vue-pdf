import { EsgTemplateModel, mockEsgTemplate } from '@/models/esg-template-model'
import { action, computed, observable } from 'mobx'

export class SettingsEvalViewModel {
  @observable esgTemplateDataArr: EsgTemplateModel[] = mockEsgTemplate
  @observable displayedTemplate: EsgTemplateModel | undefined = undefined

  constructor() {
    //
  }

  @computed get templateNameList() {
    const idAndNameArr = this.esgTemplateDataArr.map((esgTemplate) => {
      return {
        text: esgTemplate.templateName,
        value: esgTemplate.id,
      }
    })
    return idAndNameArr
  }

  @computed get displayedCorrespondData() {
    if (!this.displayedTemplate) return []
    return this.displayedTemplate!.correspond.slice().sort((item) => item.displayOrder)
  }

  @action.bound setDisplayedTemplateById(templateId: string) {
    const foundTemplate = this.esgTemplateDataArr.find((esgTemplate) => esgTemplate.id === templateId)
    this.displayedTemplate = JSON.parse(JSON.stringify(foundTemplate)) // Store a copy of found template to display
  }

  @action.bound deleteDisplayedCorrespondRecord(evalMasterId: string, nriEvalMasterId: string) {
    const correspondDataArr = this.displayedTemplate!.correspond
    const toBeDeletedIndex = correspondDataArr.findIndex(
      (correspond) => correspond.id === evalMasterId && correspond.nriId === nriEvalMasterId
    )
    correspondDataArr.splice(toBeDeletedIndex, 1)
  }
}
