import * as React from "react"
import { Check, Package, ShoppingCart, Truck, Loader2 } from "lucide-react"

// Import shadcn/ui components (ensure these are installed in your project)
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

// --- 1. Order Status Enum and Definitions ---

enum ORDER_STATUS {
  PLACED = 'placed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered'
}

type TimelineStepDefinition = {
  status: ORDER_STATUS;
  title: string;
  description: string;
  icon: React.ElementType;
};

// Define the static list of order steps
const ORDER_STEPS_DEFINITION: TimelineStepDefinition[] = [
  {
    status: ORDER_STATUS.PLACED,
    title: "Order Placed",
    description: "Your order has been successfully placed.",
    icon: ShoppingCart,
  },
  {
    status: ORDER_STATUS.PROCESSING,
    title: "Processing & Preparation",
    description: "We are preparing your items for shipment.",
    icon: Package,
  },
  {
    status: ORDER_STATUS.SHIPPED,
    title: "Shipped",
    description: "Your order has been shipped and is on its way.",
    icon: Truck,
  },
  {
    status: ORDER_STATUS.DELIVERED,
    title: "Delivered",
    description: "Your order has been delivered to your address.",
    icon: Check,
  },
];


// --- 2. Helper Function to Determine Step Status ---

type StepCalculatedStatus = "completed" | "in-progress" | "pending";

type CalculatedTimelineStep = TimelineStepDefinition & {
  timelineStatus: StepCalculatedStatus;
};

/**
 * Calculates the display status (completed, in-progress, pending) for each step
 * based on the current order status.
 */
function getCalculatedSteps(currentOrderStatus: ORDER_STATUS): CalculatedTimelineStep[] {
  // Find the index of the current status in the static definition
  const currentStatusIndex = ORDER_STEPS_DEFINITION.findIndex(
    step => step.status === currentOrderStatus
  );

  // If status is not found, assume all are pending
  if (currentStatusIndex === -1) {
    return ORDER_STEPS_DEFINITION.map(step => ({ ...step, timelineStatus: "pending" }));
  }

  return ORDER_STEPS_DEFINITION.map((step, index) => {
    let timelineStatus: StepCalculatedStatus;

    if (index < currentStatusIndex) {
      // Steps before the current one are completed
      timelineStatus = "completed";
    } else if (index === currentStatusIndex) {
      if (currentOrderStatus == ORDER_STATUS.DELIVERED) {
        timelineStatus = "completed"
      } else {
        timelineStatus = "in-progress";
      }
    } else {
      // Steps after the current one are pending
      timelineStatus = "pending";
    }

    return {
      ...step,
      timelineStatus,
    };
  });
}

// --- 3. Individual Timeline Item Component ---

type TimelineItemProps = {
  step: CalculatedTimelineStep; // Use the calculated step type
  isLast: boolean;
};

const TimelineItem: React.FC<TimelineItemProps> = ({ step, isLast }) => {
  const { title, description, icon: Icon, timelineStatus } = step // Destructure timelineStatus

  // Determine status flags
  const isCompleted = timelineStatus === "completed"
  const isInProgress = timelineStatus === "in-progress"

  // Tailwind classes based on status
  const iconBaseClasses = "size-5 transition-colors"

  const iconBgClasses = isCompleted
    ? "bg-primary border-primary text-primary-foreground" // Completed: Primary color
    : isInProgress
      ? "bg-blue-500 border-blue-500 text-white" // In-Progress: Custom blue
      : "bg-background border-border text-muted-foreground" // Pending: Muted color

  // Line should be primary if the STEP is completed OR if the NEXT step is in-progress
  // For horizontal, the line should be primary if the current step is completed.
  const lineColorClasses = isCompleted ? "bg-primary" : "bg-border"

  // Icon container styling for circle and centering
  const IconContainerClasses = `flex items-center justify-center p-2 rounded-full border-2 z-10 transition-colors ${iconBgClasses}`

  const TitleBadge = isCompleted ? (
    <Badge variant="default" className="text-xs">
      Completed
    </Badge>
  ) : isInProgress ? (
    <Badge className="bg-blue-500 hover:bg-blue-600 text-xs">
      In Progress
    </Badge>
  ) : (
    <Badge variant="outline" className="text-xs">
      Pending
    </Badge>
  )

  // --- Horizontal Layout Classes ---
  const StepItemClasses = "relative flex flex-col items-center flex-1 text-center min-w-[150px] sm:min-w-[180px]"

  // The line separator connects the current icon to the next icon
  const SeparatorClasses = `absolute top-[1.4rem] left-[50%] w-full h-0.5 transform -translate-x-1/2 z-0 transition-colors duration-500 ${lineColorClasses}`

  return (
    <div className={StepItemClasses}>
      {/* 1. Horizontal Line (Separator) */}
      {!isLast && <Separator className={SeparatorClasses} />}

      {/* 2. Icon Indicator (Circle) */}
      <div className={IconContainerClasses} aria-label={title}>
        {isInProgress ? <Loader2 className={`${iconBaseClasses} animate-spin`} /> : <Icon className={iconBaseClasses} />}
      </div>

      {/* 3. Content Card - positioned below the icon and line */}
      <div className="mt-8 w-full">
        <Card className="shadow-sm">
          <CardContent className="p-3">
            <div className="mb-2">
              <h3 className="font-semibold text-sm sm:text-base">{title}</h3>
            </div>
            <div className="mb-2">{TitleBadge}</div>
            <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// --- 4. Main Order Process Timeline Component ---

interface OrderProcessTimelineProps {
  // Enforce type safety for the status prop
  status: ORDER_STATUS;
}

export const OrderProcessTimeline = ({
  status
}: OrderProcessTimelineProps) => {
  // Calculate the timeline steps ONCE in the parent component
  const steps = getCalculatedSteps(status);

  return (
    <div className="w-full mx-auto p-4 md:p-6 bg-background border rounded-lg">
      <h2 className="text-2xl font-bold mb-8 text-center capitalize">
        Order Status: <span className="text-blue-500">{status}</span>
      </h2>

      {/* Horizontal Flow Container */}
      <div className="flex flex-row justify-between items-start space-x-2 overflow-x-auto pb-4">
        {steps.map((step, index) => (
          <TimelineItem
            key={index}
            step={step} // Pass the calculated step object
            isLast={index === steps.length - 1}
          // The 'status' prop is no longer needed here, as the status is in 'step.timelineStatus'
          />
        ))}
      </div>
    </div>
  )
}

// --- Example Component to show usage ---
export const HorizontalTimelineExample = () => (
  // Pass any defined status from the enum
  <OrderProcessTimeline status={ORDER_STATUS.PROCESSING} />
);
