import { Suspense } from "react";
import AdminNav from "../components/admin/AdminNav";

export const metadata ={
    title: 'E-Commerce Admin',
    description: 'E-Commerce Admin Dashboard'
}

const AdminLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      <Suspense>
      <AdminNav/>
        {children}
      </Suspense>
    </div>
  )
}

export default AdminLayout;