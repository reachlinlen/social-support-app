// export type FieldValues = Record<string, any>
// export type Path<T> = T extends any ? PathInternal<T> : never
// export type FieldPath<TFieldValues extends FieldValues> = Path<TFieldValues>

// export type ControllerProps<
//   TFieldValues extends FieldValues = FieldValues,
//   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
//   TTransformedValues = TFieldValues,
// > = {
//   render: ({
//     field,
//     fieldState,
//     formState,
//   }: {
//     field: ControllerRenderProps<TFieldValues, TName>
//     fieldState: ControllerFieldState
//     formState: UseFormStateReturn<TFieldValues>
//   }) => React.ReactElement
// } & UseControllerProps<TFieldValues, TName, TTransformedValues>
