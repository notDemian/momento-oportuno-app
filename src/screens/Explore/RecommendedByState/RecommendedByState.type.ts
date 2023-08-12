import { ExploreProps } from '../Explore.type'

export type RecommendedByStateProps = Pick<ExploreProps, 'navigation'> & {
  state: string
}
