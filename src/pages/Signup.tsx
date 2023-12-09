import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
type User = {email: string; password: string}
const Signup = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { mutate } = useMutation({
    mutationFn: async (user: User) => {
      try {
        const response = await axios.post(`http://localhost:3000/register`, user)
        return response.data
      } catch (error) {
        console.log(error)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["USER"]
      })
      alert('Ban da dang ky thanh cong')
      reset()
      setTimeout(() => {
        navigate("/products")
      }, 2000)
    }
  })
  const { register, handleSubmit, formState: { errors }, reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit: SubmitHandler<User> = (data) => {
     mutate(data)
    console.log(data)
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-ground">
          <div className="form-label">Email</div>
          <input
            className="form-control"
            type="email"
            {...register("email", { required: true })}
            
          />
          {errors.email && (
            <p className="error-message">Vui lòng nhập Email</p>
          )}
        </div>
        <div className="form-ground">
          <div className="form-label">Mat khau</div>
          <input
            className="form-control"
            type="password"
            {...register("password", { required: true, min: 1 })}
          />
          {errors.password && (
            <p className="error-message">Vui lòng nhập mat khau</p>
          )}
        </div>
        <button className="btn btn-primary">Dang ky</button>
      </form>
    </div>
  )
}

export default Signup