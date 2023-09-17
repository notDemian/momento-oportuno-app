import { ExploreProps } from '../Explore.type'

import { Estado } from '@src/api'

export type RecommendedByStateProps = Pick<ExploreProps, 'navigation'> & {
  state: Estado
}
