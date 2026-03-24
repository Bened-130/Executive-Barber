import { Outlet } from "react-router-dom"
import AdminNav from "../Components/AdminNav"

function AdminLayout(){
    return(
        <div className='mx-2 '>
            <AdminNav/>
            <main className=' lg:pl-72 p-6  min-h-screen'>
                <Outlet/>
            </main>
        </div>
    )
}
export default AdminLayout