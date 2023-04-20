import { AnyAction } from 'redux'
import { produce } from 'immer'
import { BreadcrumbState } from '@/store/types'
import * as types from '@/store/mutation-types'

const breadcrumbState: BreadcrumbState = {
  breadcrumbList: []
}

const breadcrumb = (state: BreadcrumbState = breadcrumbState, action: AnyAction) =>
  produce(state, (draftState: any) => {
    switch (action.type) {
      case types.SET_BREADCRUMB_LIST:
        draftState.breadcrumbList = action.breadcrumbList
        break

      default:
        return draftState
    }
  })

export default breadcrumb
