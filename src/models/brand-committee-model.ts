export interface BrandCommitteeModel {
  committeeName: string
  total: string
  standingTotal: string
  directorTotal: string
  outsideTotal: string
  chairperson: string
}
export const mockCommitteeData: BrandCommitteeModel[] = [
  {
    committeeName: '指名委員会',
    total: '5',
    standingTotal: '1',
    directorTotal: '1',
    outsideTotal: '4',
    chairperson: '社外取締役',
  },
  {
    committeeName: '報酬委員会',
    total: '5',
    standingTotal: '2',
    directorTotal: '2',
    outsideTotal: '3',
    chairperson: '社外取締役',
  },
  {
    committeeName: '監査委員会',
    total: '6',
    standingTotal: '2',
    directorTotal: '2',
    outsideTotal: '4',
    chairperson: '社外取締役',
  },
]
