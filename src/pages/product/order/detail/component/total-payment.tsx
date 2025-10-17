import { Separator } from "@/components/ui/separator"
import { DetailCard } from "./detail-card"
import { DetailCardTitle } from "./detail-card-title"

interface TotalPaymentCardProps {
  sub_total: string;
}

export const TotalPaymentCard = ({
  sub_total
}: TotalPaymentCardProps) => {
  return (
    <DetailCard>
      <DetailCard.Header>
        <DetailCardTitle>
          <h4 className="text-lg text-bold">Payment Info</h4>
        </DetailCardTitle>
      </DetailCard.Header>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <span className="text-base font-normal ">Subtotal</span>
          <span className="text-base font-semibold">฿ {sub_total}</span>
        </div>
        <Separator />
        <div className="flex justify-between">
          <span className="text-base font-normal">Shipping</span>
          <span className="text-base font-semibold">-</span>
        </div>
        <Separator />
        <div className="flex justify-between pt-4">
          <span className="text-lg font-bold">Total Payment</span>
          <span className="text-lg font-bold">฿ {sub_total}</span>
        </div>
      </div>
    </DetailCard>


  )
}
