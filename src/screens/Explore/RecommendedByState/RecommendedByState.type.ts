import { ExploreProps } from '../Explore.type'

import { State } from '@src/api'

export type RecommendedByStateProps = Pick<ExploreProps, 'navigation'> & {
  state: State
}
