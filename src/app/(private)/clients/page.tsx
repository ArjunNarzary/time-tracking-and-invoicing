import AddClient from "../_components/client/add-client"

export default function ClientsPage() {
  return (
    <div className="flex flex-col w-full gap-4 p-4 md:gap-6 md:p-6">
      <div className="flex justify-between items-center">
        <div></div>
        <AddClient />
      </div>
    </div>
  )
}
