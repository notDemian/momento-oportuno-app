import { z } from 'zod'

export interface User {
  token: string
  user_display_name: string
  user_email: string
  user_nicename: string
}

export type logInRes = User

export type registerRes = { message: string; title: string }

export const logInParamsSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export type logInParams = z.infer<typeof logInParamsSchema>

export const registerParamsSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
  phone: z.string(),
})

export type registerParams = z.infer<typeof registerParamsSchema>

export interface GetUserByIdResponse {
  id: number
  name: string
  url: string
  description: string
  link: string
  slug: string
  avatar_urls: { [key: string]: string | null }
  meta: any[]
  acf: any[]
  is_super_admin: boolean
  woocommerce_meta: WoocommerceMeta
  _links: {
    self: {
      href: string
    }[]
    collection: {
      href: string
    }[]
  }
}

export interface WoocommerceMeta {
  variable_product_tour_shown: string
  activity_panel_inbox_last_read: string
  activity_panel_reviews_last_read: string
  categories_report_columns: string
  coupons_report_columns: string
  customers_report_columns: string
  orders_report_columns: string
  products_report_columns: string
  revenue_report_columns: string
  taxes_report_columns: string
  variations_report_columns: string
  dashboard_sections: string
  dashboard_chart_type: string
  dashboard_chart_interval: string
  dashboard_leaderboard_rows: string
  homepage_layout: string
  homepage_stats: string
  task_list_tracked_started_tasks: string
  help_panel_highlight_shown: string
  android_app_banner_dismissed: string
}
