import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useBaseHook } from "@/hooks/base.hook";
import { DetailCard } from "./component/detail-card";
import { DetailCardTitle } from "./component/detail-card-title";

interface OrderDetailProps {
  orderId: string;
}

export const OrderDetail = ({
  orderId
}: OrderDetailProps) => {
  const {
    data,
    isPending,
    error
  } = useBaseHook('orders', `/order/${orderId}`);

  if (isPending) return <h1>Loading...</h1>
  if (error) return <h1>Failed to fetch...</h1>

  console.log(`data: `, data);

  return (
    <div className="mt-8 mx-8">
      <div>
        <h1 className="text-bold text-3xl mb-6">Order Detail</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex gap-6 items-center">
              <h3 className="text-xl">Order #{orderId}</h3>
              <h4 className="text-md text-gray-500">{data?.createdAt}</h4>
              <h4 className="text-md text-gray-500">{data?.order_items?.length} products</h4>
            </div>
          </CardTitle>
        </CardHeader>
        <Separator />

        <CardContent>
          <Card>
            <CardHeader>
              <CardTitle>Billing Address</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-gray-600">
                  {data?.shipping_address.address}
                </p>
                <p className="text-sm text-gray-600">
                  {data?.shipping_address.city}, {data?.shipping_address.state}{" "}
                  {data?.shipping_address.zip_code}
                </p>
                <p className="text-sm text-gray-600">
                  {data?.shipping_address.country}
                </p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <DetailCard>
        {/* The Header wrapper containing the Title layout */}
        <DetailCard.Header>
          <DetailCardTitle>
            <h3 className="text-xl">Order #{orderId}</h3>
            <h4 className="text-md text-gray-500">{data?.createdAt}</h4>
            <h4 className="text-md text-gray-500">{data?.order_items?.length} products</h4>
          </DetailCardTitle>
        </DetailCard.Header>

        {/* The Content (children) */}
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-600">
            {data?.shipping_address.address}
          </p>
          <p className="text-sm text-gray-600">
            {data?.shipping_address.city}, {data?.shipping_address.state}{" "}
            {data?.shipping_address.zip_code}
          </p>
          <p className="text-sm text-gray-600">
            {data?.shipping_address.country}
          </p>
        </div>
      </DetailCard>
    </div >
  )
}
