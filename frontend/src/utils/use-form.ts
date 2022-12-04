import { useCallback, useReducer } from "preact/hooks"

export default function useForm<T>(shape: T) {
  const [formData, update] = useReducer(formUpdateHandler, shape)
  const inform = useCallback((name: string, value: any) =>
    update({ target: { name, value } }), []
  )
  return { formData, update, inform }
}

function formUpdateHandler<T>(state: T, event: any): T {
  const { name, value } = event.target
  return {
    ...state, [name]: value
  }
}