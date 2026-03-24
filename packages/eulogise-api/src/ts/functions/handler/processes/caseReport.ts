import { CaseReportController } from '../../controller/resource/CaseReportController'

export const populateCaseReportTableHandler = async () => {
  console.log('populateCaseReportTable start')
  await CaseReportController.updateCaseReportTable()
  console.log('populateCaseReportTable complete')
}
