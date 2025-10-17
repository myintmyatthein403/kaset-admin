
import * as React from "react"
import { Check, Package, ShoppingCart, Truck } from "lucide-react"

// Import shadcn/ui components (ensure these are installed in your project)
// pnpm dlx shadcn-ui@latest add card separator badge
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

// --- Component Data Structure ---

// Define the structure for a single step in the timeline
type TimelineStep = {
  id: number
  title: string
  description: string
  icon: React.ElementType // Use React.ElementType for Lucide icons
  status: "completed" | "in-progress" | "pending"
}

// Define the order process steps
const orderSteps: TimelineStep[] = [
  {
    id: 1,
    title: "Order Placed",
    description: "Your order has been successfully placed and is awaiting processing.",
    icon: ShoppingCart,
    status: "completed",
  },
  {
    id: 2,
    title: "Processing & Preparation",
    description: "We are preparing your items for shipment.",
    icon: Package,
    status: "in-progress",
  },
  {
    id: 3,
    title: "Shipped",
    description: "Your order has been shipped and is on its way.",
    icon: Truck,
    status: "pending",
  },
  {
    id: 4,
    title: "Delivered",
    description: "Your order has been delivered to your address.",
    icon: Check,
    status: "pending",
  },
]

// --- Individual Timeline Item Component ---

type TimelineItemProps = {
  step: TimelineStep
  isLast: boolean
}

const TimelineItem: React.FC<TimelineItemProps> = ({ step, isLast }) => {
  const { title, description, icon: Icon, status } = step

  // Tailwind classes based on status
  const iconBaseClasses = "size-5"
  const iconColorClasses =
    status === "completed"
      ? "text-primary bg-primary/10 border-primary"
      : status === "in-progress"
        ? "text-blue-500 bg-blue-500/10 border-blue-500"
        : "text-muted-foreground bg-muted border-border"

  const lineClasses = "h-full w-0.5"
  const lineColorClasses = status === "completed" ? "bg-primary" : "bg-border"

  // Icon container styling for circle and centering
  const IconContainer =
    status === "completed" || status === "in-progress"
      ? "flex items-center justify-center p-2 rounded-full border-2"
      : "flex items-center justify-center p-2 rounded-full border-2"

  const TitleBadge = status === "completed" ? (
    <Badge variant="default" className="ml-3">
      Completed
    </Badge>
  ) : status === "in-progress" ? (
    <Badge className="ml-3 bg-blue-500 hover:bg-blue-600">
      In Progress
    </Badge>
  ) : (
    <Badge variant="outline" className="ml-3">
      Pending
    </Badge>
  )

  return (
    <div className="relative flex">
      {/* Timeline Indicator Column (Circle and Line) */}
      <div className="flex flex-col items-center">
        {/* Circle/Icon */}
        <div className={`${IconContainer} ${iconColorClasses}`}>
          <Icon className={iconBaseClasses} />
        </div>
        {/* Vertical Line/Separator (only draw line if not the last item) */}
        {!isLast && <Separator orientation="vertical" className={`${lineClasses} ${lineColorClasses}`} />}
      </div>

      {/* Content Column (Card) */}
      <div className="ml-6 pb-8 flex-1">
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center mb-1">
              <h3 className="font-semibold text-lg">{title}</h3>
              {TitleBadge}
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// --- Main Order Process Timeline Component ---

export const PaymentProcessTimeline = () => {
  return (
    <div className="max-w-xl mx-auto p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Order Status: <span className="text-blue-500">Processing</span>
      </h2>
      <div className="space-y-0">
        {orderSteps.map((step, index) => (
          <TimelineItem
            key={step.id}
            step={step}
            isLast={index === orderSteps.length - 1}
          />
        ))}
      </div>
    </div>
  )
}
