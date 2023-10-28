import * as z from 'zod'

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  phone: z.string().nullable(),
  email_verified_at: z.string().nullable().default(null),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})
export type User = z.infer<typeof UserSchema>

export const GeneralLogInSchema = z.object({
  token: z.string(),
  user: UserSchema,
})
export type GeneralLogIn = z.infer<typeof GeneralLogInSchema>

export type logInRes = GeneralLogIn

export type registerRes = GeneralLogIn

export type logInParams = {
  email: string
  password: string
}

export type registerParams = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

// export const DataSchema = z.object({
//   id: z.number(),
//   name: z.string(),
//   email: z.string(),
// });
// export type Data = z.infer<typeof DataSchema>;

export const GetMeResponseSchema = z.object({
  data: UserSchema.omit({
    email_verified_at: true,
    created_at: true,
    updated_at: true,
  }),
})
export type GetMeResponse = z.infer<typeof GetMeResponseSchema>

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
