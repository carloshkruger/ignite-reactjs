import { useRouter } from "next/router"

export default function Product() {
  const { query } = useRouter()

  return (
    <div>Product {query.id}</div>
  )
}