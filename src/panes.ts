import { Except } from "type-fest"
import { AnyField } from "./fields"
import { TwoFactorOptionWithId } from "./two-factor-options"

export type ProviderMetadata = {
  display_name: string
  image_url: string
  primary_color?: string
  secondary_color?: string
}

type Pane<
  Name extends string,
  PaneRenderProps extends Record<string, unknown>,
  PaneSubmitProps extends Record<string, unknown>
> = {
  name: Name
  render_props: PaneRenderProps & { error_msg?: string }
  submit_props: PaneSubmitProps
  /** Timestamp last time pane was changed in ISO8601 format */
  last_updated_at: string
}

export type RedirectPane = Pane<
  "redirect_pane",
  {
    redirect_url: string
  },
  {
    callback_args: Record<string, string>
  }
>

export type SearchAndSelectPane = Pane<
  "search_and_select_pane",
  {
    title: string
    options: Array<{
      label: string
      value: string
      image_url?: string
    }>
  },
  { value: string }
>

export type LoginPane = Pane<
  "login_pane",
  {
    accepted_user_identifiers: Array<"email" | "phone" | "username">
    provider: ProviderMetadata
  },
  { user_identifier: string; password: string }
>

export type InitiateTwoFactorPane = Pane<
  "initiate_two_factor_pane",
  {
    options: TwoFactorOptionWithId[]
    provider: ProviderMetadata
  },
  {
    id: TwoFactorOptionWithId["id"]
  }
>

export type TwoFactorPane = Pane<
  "two_factor_pane",
  {
    code_length: number
    provider: ProviderMetadata
  },
  { code: string }
>

export type FieldsPane = Pane<
  "fields_pane",
  {
    fields: AnyField["props"][]
    header: {
      title: string
      provider?: ProviderMetadata
    }
  },
  Record<string, AnyField["input"]>
>

export type FinishedPane = Pane<"finished_pane", {}, {}>

export type AnyPane =
  | RedirectPane
  | SearchAndSelectPane
  | LoginPane
  | InitiateTwoFactorPane
  | TwoFactorPane
  | FieldsPane
  | FinishedPane

export type AnyPaneWithoutSubmitProps = Except<AnyPane, "submit_props">
