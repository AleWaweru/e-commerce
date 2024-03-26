import AdminNav from "../components/admin/AdminNav";

export const metadata ={
    title: 'E-Commerce Admin',
    description: 'E-Commerce Admin Dashboard'
}

const AdminLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      <AdminNav/>
        {children}
      
    </div>
  )
}

export default AdminLayout;