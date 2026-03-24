import { IThemeModel } from '../../database/types/ThemeModel.types'
import { themeModel } from '../../database'

export class ThemeController {
  public static async getAvailableThemes(): Promise<IThemeModel.Model[]> {
    const themes: IThemeModel.Model[] = await themeModel.getAll({ cache: true })

    // only return themes that are not deleted
    return themes.filter((t) => !t.deleted)
  }
}
