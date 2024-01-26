"use client";

import { Order, User } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import formatPrice from "@/utils/formatPrice";
import Heading from "@/app/components/Products/Heading";
import Status from "@/app/components/Status";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md";
import ActionBtn from "@/app/components/Products/ActionBtn";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";

interface ManageOrdersClientProps{
orders: ExtendedOrder[];
}

type ExtendedOrder = Order & {
  user: User
}
const ManageOrdersClient: React.FC<ManageOrdersClientProps> = ({
  orders,
}) => {

  const router = useRouter();
  let rows: any[] = [];

  if (orders) {
    rows = orders.map((order) => {
      return {
        id: order.id,
        customer: order.user.name,
        amount: formatPrice(order.amount/ 100),
        paymentStatus: order.status,
        date: moment(order.createDate).fromNow(),
        deliveryStatus: order.deliveryStatus,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "customer", headerName: "Customer Name", width: 130 },
    {
      field: "amount",
      headerName: "Amount(USD)",
      width: 130,
      renderCell: (param) => {
        return (
          <div className="font-bold text-slate-800">{param.row.amount}</div>
        );
      },
    },
  
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 130,
      renderCell: (param) => {
        return (
          <div>
            {param.row.paymentStatus === 'pending' ? (
              <Status
                text="pending"
                icon={MdAccessTimeFilled}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : param.row.paymentStatus === 'completed' ?  (
              <Status
                text="completed"
                icon={MdDone}
                bg="bg-green-200"
                color="text-green-700"
              />
            ) : (<></> )}
          </div>
        );
      },
    },
    {
      field: "deliveryStatus",
      headerName: "Delivery Status",
      width: 130,
      renderCell: (param) => {
        return (
          <div>
            {param.row.deliveryStatus === 'pending' ? (
              <Status
                text="pending"
                icon={MdAccessTimeFilled}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : param.row.deliveryStatus === 'dispatched' ?  (
              <Status
                text="dispatched"
                icon={MdDeliveryDining}
                bg="bg-purple-200"
                color="text-purple-700"
              />
            ) : param.row.deliveryStatus === 'delivered' ?  (
              <Status
                text="delivered"
                icon={MdDone}
                bg="bg-green-200"
                color="text-green-700"
              />
            ): <></> }
          </div>
        );
      },
    },

    {
      field: "date",
      headerName: "Date",
      width: 130,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return <div className="flex justify-between gap-4 w-full">
          <ActionBtn icon={MdDeliveryDining} onClick={()=>{
            handleDispatch(params.row.id);
          }}/>
          <ActionBtn icon={MdDone} onClick={()=>{
            handleDeliver(params.row.id)
          }}/>
          <ActionBtn icon={MdRemoveRedEye} onClick={()=>{
            router.push(`order/${params.row.id}`)
          }}/>
        </div>;
      },
    },
  ];

  const handleDispatch = useCallback((id: string) =>{
    axios.put('/api/order', {
      id,
      deliveryStatus: 'dispatched'
    }).then((res)=>{
      toast.success("Order Dispatched");
      router.refresh();
    }).catch((err)=>{
      toast.error("Something went wrong")
      console.log(err);
    })
  },[]);
  const handleDeliver = useCallback((id: string) =>{
    axios.put('/api/order', {
      id,
      deliveryStatus: 'delivered'
    }).then((res)=>{
      toast.success("Order Deleivered");
      router.refresh();
    }).catch((err)=>{
      toast.error("Something went wrong")
      console.log(err);
    })
  },[]);

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage Orders" center />
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default ManageOrdersClient;
