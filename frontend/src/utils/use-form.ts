import { useReducer } from "preact/hooks"

export default function useForm<T>(shape: T) {
  return useReducer(formUpdateHandler, shape)
}

function formUpdateHandler<T>(state: T, event: any): T {
  const { name, value } = event.target
  return {
    ...state, [name]: value
  }
}