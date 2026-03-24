export class ReportHelper {
  public static getReportFileName() {
    return `report.csv`
  }

  public static getReportS3FilePath() {
    return `reports/${this.getReportFileName()}`
  }
}
