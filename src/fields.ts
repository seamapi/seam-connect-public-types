export type Field<Type extends string, Props, Input> = {
  props: {
    label: string
    is_required: boolean
    name: string
    type: Type
  } & Props
  input: Input
}

export type TextField = Field<
  "text",
  {
    placeholder: string
    regex?: string
    text_type?: "text" | "password" | "email" | "number" | "tel" | "url"
  },
  string
>

export type SelectionField = Field<
  "selection",
  {
    options: Array<{
      label: string
      value: string
    }>
  },
  string
>

export type AnyField = TextField | SelectionField
