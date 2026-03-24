import {
  GUIDE_SHOW_UP_PAGE,
  GUIDE_WALK_THROUGH_ROUTERS_START_WITH,
} from '@eulogise/core'

export const EulogiseGuideHelper = {
  findShowGuideAt: (pathname: string) => {
    if (pathname.startsWith(GUIDE_WALK_THROUGH_ROUTERS_START_WITH.DASHBOARD)) {
      return GUIDE_SHOW_UP_PAGE.DASHBOARD
    } else if (
      pathname.startsWith(GUIDE_WALK_THROUGH_ROUTERS_START_WITH.BOOKLET)
    ) {
      return GUIDE_SHOW_UP_PAGE.BOOKLET
    } else if (
      pathname.startsWith(GUIDE_WALK_THROUGH_ROUTERS_START_WITH.SLIDESHOW)
    ) {
      return GUIDE_SHOW_UP_PAGE.SLIDESHOW
    } else if (
      pathname.startsWith(
        GUIDE_WALK_THROUGH_ROUTERS_START_WITH.CLIENT_DASHBOARD_PART_ONE,
      )
    ) {
      return GUIDE_SHOW_UP_PAGE.CLIENT_DASHBOARD_PART_ONE
    } else if (
      pathname.startsWith(
        GUIDE_WALK_THROUGH_ROUTERS_START_WITH.CLIENT_DASHBOARD_PART_TWO,
      )
    ) {
      return GUIDE_SHOW_UP_PAGE.CLIENT_DASHBOARD_PART_TWO
    }
    return GUIDE_SHOW_UP_PAGE.NULL
  },
}
