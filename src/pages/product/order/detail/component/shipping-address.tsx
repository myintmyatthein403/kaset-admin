import { DetailCard } from "./detail-card"
import { DetailCardTitle } from "./detail-card-title"

interface ShippingAddressCardProps {
  data: {
    name: string;
    email: string;
    address: string;
    house_number: string;
    road: string;
    sub_district: string;
    district: string;
    province: string;
    postal_code: string;
    country: string;
    phone_number: string;
  }
}

export const ShippingAddressCard = ({
  data
}: ShippingAddressCardProps) => {
  return (
    <DetailCard>
      <DetailCard.Header>
        <DetailCardTitle>
          <h4 className="text-lg text-bold">Shipping Address</h4>
        </DetailCardTitle>
      </DetailCard.Header>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <p className="text-lg text-semi-bold">{data?.name}</p>

            <p className="text-sm text-gray-400">
              {data?.house_number}, {data?.address}
            </p>
            <p className="text-sm text-gray-400">
              {data?.sub_district}, {data?.district}{" "}
              {data?.province}, {data?.postal_code}
            </p>
            <p className="text-sm text-gray-400">
              {data?.country}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-lg text-semi-bold">Email</p>
          <p className="text-sm">
            {data?.email}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-lg text-semi-bold">Phone</p>
          <p className="text-sm">
            {data?.phone_number}
          </p>
        </div>
      </div>
    </DetailCard>


  )
}
