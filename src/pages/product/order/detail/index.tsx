import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useBaseHook } from "@/hooks/base.hook";
import { ShippingAddressCard } from "./component/shipping-address";
import { PaymentCard } from "./component/payment";
import { TotalPaymentCard } from "./component/total-payment";
import { OrderProcessTimeline } from "./component/order-process";
import { DataTable } from "@/components/custom/data-table/data-table";
import type { MEDIA } from "@/common/types/type";
import { config } from "@/common/config/config";
import { formatISOTimestamp } from "@/common/utils/time.util";
import { useNavigate } from "@tanstack/react-router";
import { ChangeOrderStatus } from "./component/change-order-status";
import { ChangePaymentStatus } from "./component/change-payment-status";

interface OrderDetailProps {
  orderId: string;
}

export const OrderDetail = ({
  orderId
}: OrderDetailProps) => {
  const navigate = useNavigate()
  const {
    data,
    isPending,
    error
  } = useBaseHook(`order-${orderId}`, `/order/${orderId}`);

  if (isPending) return <h1>Loading...</h1>
  if (error) return <h1>Failed to fetch...</h1>


  const columns = [
    {
      accessorKey: "product",
      header: "Product Image",
      cell: ({ row }: { row: any }) => {
        const media = row.getValue('product')?.product_images as MEDIA[];
        if (!media || !media[0]?.url) return null;
        const imgSrc = `${config.BASE_MEDIA_URL}${media[0]?.url
          }`;
        return (
          <div className="flex gap-2 items-center">
            <img src={imgSrc} alt="home-slide-show" className="w-15 h-15 rounded-full" />
            <span>{row.getValue('product')?.name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "variation",
      header: "Variation",
      cell: ({ row }: { row: any }) => (
        <div>{row.getValue('variation')?.size}-{row.getValue('variation')?.color_name}</div>
      ),
    },
    {
      accessorKey: "price_at_order",
      header: "Unit Price",
      cell: ({ row }: { row: any }) => (
        <div>฿ {row.getValue("price_at_order")}</div>
      )
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }: { row: any }) => (
        <div>x{row.getValue("quantity")}</div>
      ),
    },
    {
      accessorKey: "total_price",
      header: "Total Price",
      cell: ({ row }: { row: any }) => (
        <span>฿ {Number(row?.original?.price_at_order) * Number(row?.original?.quantity)}</span>
      )
    },
  ];


  return (
    <div className="mt-8 mx-8">
      <div>
        <h1 className="text-bold text-3xl mb-6">Order Detail</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-center">
              <div className="flex gap-6 items-center">
                <h3 className="text-xl">Order #{data?.order_id}</h3>
                <h4 className="text-md text-gray-500">{formatISOTimestamp(data?.createdAt)}</h4>
                <h4 className="text-md text-gray-500">{data?.order_items?.length} products</h4>
              </div>
              <span onClick={() => navigate({ to: '/product/orders' })} className="cursor-pointer text-blue-500 underline link link-hover ">Go back to list</span>
            </div>
          </CardTitle>
        </CardHeader>
        <Separator />

        <CardContent>
          <div className="grid grid-cols-6 gap-4">
            <div className="grid gap-4 col-span-5">
              <div className="grid grid-cols-3 gap-4">
                <ShippingAddressCard data={{ ...data?.shipping_address, name: data?.customer?.name, email: data?.customer?.email }} />
                <TotalPaymentCard sub_total={data?.total_amount} />
                <PaymentCard info={{
                  method: data?.payment_method,
                  status: data?.payment_status,
                  transactionId: data?.dinger_transaction_id ? data?.dinger_transaction_id : data?.stripe_transaction_id,
                  date: data?.createdAt,
                }} />
              </div>
              <OrderProcessTimeline status={data?.order_status} />
              <DataTable columns={columns} data={data?.order_items} />
            </div>
            <div className="flex flex-col gap-4">
              <ChangeOrderStatus orderId={orderId} status={data?.order_status} />
              <ChangePaymentStatus orderId={orderId} status={data?.payment_status} />
            </div>
          </div>
        </CardContent>
      </Card>

    </div >
  )
}
