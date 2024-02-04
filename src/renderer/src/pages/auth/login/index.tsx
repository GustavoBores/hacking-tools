import type { ApiErrorServerResponse, ApiSucessResponse } from "@renderer/types/api"
import type { LoginSchemaType } from "@renderer/schema/schema"
import type { AxiosError, AxiosResponse } from "axios"

import { C, S }  from "@renderer/components/Form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"

import axios from "axios"

import { useState } from "react"

import { loginSchema } from "@renderer/schema/schema"

import useAuth from "@renderer/hook/useAuth"

function Login(): JSX.Element {
  const { set } = useAuth()

  const [errorMessage, setErrorMessage] = useState<ApiErrorServerResponse | undefined>(undefined)

  const { mutateAsync, isPending } = useMutation
  <
    AxiosResponse<ApiSucessResponse>, 
    AxiosError<ApiErrorServerResponse>, 
    LoginSchemaType
  >
  ({
      mutationKey: ["login"],
      
      mutationFn (data) {
        setErrorMessage(undefined)
        resetField("password")
        return axios.post(`${import.meta.env.RENDERER_VITE_SERVER}/`, data)
      },

      onSuccess(data) { 
        set(data.data.token)
      },

      onError(error) {
        if ( error.code === "ERR_NETWORK" ) {
          setErrorMessage({
            errors: [error.message]
          })
          return
        }

        setErrorMessage(error.response?.data)
      }
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    resetField,
  } = useForm<LoginSchemaType>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  })

  const handleFormSubmit = async (data: LoginSchemaType) => {
    await mutateAsync(data)
  }

  return (
    <C.Form
      typeForm="login"
      buttonForm={handleSubmit(handleFormSubmit)}
    >
      <S.SErrorMessageForm 
        $isVisible={!!errorMessage}

      >{errorMessage?.errors || ""}

      </S.SErrorMessageForm>

      <div>
        <S.SInputForm
          $hasComplete={isValid}
          $hasError={!!errors.email?.message}
          type="text"
          placeholder="Email"
          {...register("email")}
        />
        <span>{errors.email?.message}</span>
      </div>

      <div>
        <S.SInputForm
          $hasComplete={isValid}
          $hasError={!!errors.password?.message}
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <span>{errors.password?.message}</span>
      </div>

      <S.SButtonForm
        $isLoading={isPending}
        disabled={isPending}
        type="submit"
      >
        {isPending ? "Loading..." : "Login"}
      </S.SButtonForm>
    </C.Form>
  )
}

export default Login