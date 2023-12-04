import { useQuery } from "@tanstack/react-query"
import axios from "axios"
const List = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["PRODUCTS"],
    queryFn: async () => {
      try {
        const response = await axios.get("http://localhost:3000/products")
        return response.data
      } catch (error) {
        console.log(error)
      }
    }
  })
  if (isLoading) return <div>Loading</div>
  if (isError) return <div>Error</div>
  return (
<div>
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>
            #
          </th>
          <th>Teen sanr pham</th>
          <th>Gia</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data?.map((product: { id?: number, name: string, price: number }, index: number) => (
          <tr key={product?.id}>
            <td>{index + 1}</td>
            <td>{product?.name}</td>
            <td>{product?.price}</td>
            <table>
              <button className="btn btn-danger">Cap nhat</button>
              <button className="btn btn-primary">Xoa</button>

            </table>
          </tr>
        ))}
      </tbody>
    </table>

  </div>
  )
  

}

export default List