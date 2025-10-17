import { formatISOTimestamp } from "@/common/utils/time.util";
import { DetailCard } from "./detail-card"
import { DetailCardTitle } from "./detail-card-title"

interface PaymentCardProps {
  info: {
    method: string;
    status: string;
    transactionId: string;
    date: string;
  }
}

export const PaymentCard = ({
  info
}: PaymentCardProps) => {
  return (
    <DetailCard>
      <DetailCard.Header>
        <DetailCardTitle>
          <h4 className="text-lg text-bold">Payment Info</h4>
        </DetailCardTitle>
      </DetailCard.Header>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Payment Method</span>
          <span className="text-sm font-medium">{info.method}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Transaction ID</span>
          <span className="text-sm font-medium">#{info.transactionId}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Payment Status</span>
          <span className="text-sm font-medium text-green-500">{info.status}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Payment At</span>
          <span className="text-sm font-medium text-green-500">{formatISOTimestamp(info.date)}</span>
        </div>
      </div>
    </DetailCard>


  )
}
