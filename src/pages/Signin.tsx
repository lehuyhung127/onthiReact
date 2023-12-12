import { joiResolver } from '@hookform/resolvers/joi'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Joi from 'joi'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const schemaProduct = Joi.object({
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['net', 'com'] } }).messages({
        'string.email': 'ko dung ki tu',
        'any.required': 'ko trong'
    }),
    password: Joi.string().required().min(6).messages({
        'strimg.min': 'lon hon 6 ki tu',
        'any.required': 'ko trong'
    })

})
export const Signin = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const {
        register,
        reset,
        formState: { errors },
        handleSubmit
    } = useForm({
        resolver: joiResolver(schemaProduct),
        defaultValues: {
            email: '',

            password: ''
        }
    })
    const { mutate } = useMutation({
        mutationFn: async (user: { email: string, password: string }) => {
            try {
                const response = await axios.post(` http://localhost:3000/signin`, user)
                return response.data

            } catch (error) {
                console.log(error)

            }
        },
        onSuccess: (user) => {
            queryClient.invalidateQueries({
                queryKey: ["USERS"]
            })
            alert('dn thanh cong')
            reset(),
                setTimeout(() => {
                    navigate('/products')
                }, 1000)
            localStorage.setItem("user", JSON.stringify(user))
        }
    })
    const onSubmit: SubmitHandler<{ email: string, password: string }> = (data) => {
        mutate(data)
    }
    return (
        <div>
            <h2>Sign in</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">email</span>
                    <input type="email" {...register('email')} className="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1" />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">password</span>
                    <input type="password" {...register('password')} className="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1" />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>

                <button type="submit" className="btn btn-success">Success</button>
            </form>
        </div>
    )
}
