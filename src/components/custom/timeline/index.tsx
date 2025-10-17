import * as React from "react"
import { Check, Package, ShoppingCart, Truck, X, Loader2 } from "lucide-react"

// Import shadcn/ui components (ensure these are installed in your project)
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

// --- Component Types and Data ---

// Added 'error' status and updated 'in-progress' status
type TimelineStatus = "completed" | "in-progress" | "pending" | "error"
type TimelineDirection = "vertical" | "horizontal"

interface TimelineStep {
  id: number
  title: string
  description: string
  icon: React.ElementType
  status: TimelineStatus
}

const orderSteps: TimelineStep[] = [
  {
    id: 1,
    title: "Order Placed",
    description: "Successfully placed and awaiting processing.",
    icon: ShoppingCart,
    status: "completed",
  },
  {
    id: 2,
    title: "Payment Failed", // Example of Error state
    description: "Payment failed. Please update your payment method.",
    icon: X,
    status: "error",
  },
  {
    id: 3,
    title: "Processing",
    description: "Preparing your items for shipment.",
    icon: Package,
    status: "in-progress",
  },
  {
    id: 4,
    title: "Shipped",
    description: "Order is out for delivery.",
    icon: Truck,
    status: "pending",
  },
  {
    id: 5,
    title: "Delivered",
    description: "Delivered to your address.",
    icon: Check,
    status: "pending",
  },
]

// --- Core Timeline Components ---

interface TimelineItemProps {
  step: TimelineStep
  direction: TimelineDirection
  isLast: boolean
  isPrevCompleted: boolean // NEW: for dynamic line coloring
}

const TimelineItem: React.FC<TimelineItemProps> = ({ step, direction, isLast, isPrevCompleted }) => {
  const { title, description, icon: Icon, status } = step

  // --- Style Logic based on Status ---
  const isCompleted = status === "completed"
  const isInProgress = status === "in-progress"
  const isError = status === "error"

  // Icon/Indicator Classes
  const iconBaseClasses = "size-5 transition-colors"

  const getIconContainerClasses = () => {
    if (isCompleted) return "bg-primary border-primary text-primary-foreground"
    if (isError) return "bg-destructive border-destructive text-destructive-foreground"
    if (isInProgress) return "bg-blue-500 border-blue-500 text-white"
    return "bg-background border-border text-muted-foreground"
  }

  // Separator/Line Classes
  const separatorBaseClasses = "absolute z-0 transition-colors duration-500"
  // Line is colored if the CURRENT step is completed OR the PREVIOUS step was completed (for progress coloring)
  const separatorColorClasses = isCompleted || isPrevCompleted ? "bg-primary" : "bg-border"

  const separatorLayoutClasses = direction === "horizontal"
    ? "top-1/2 -translate-y-1/2 left-[calc(1.5rem+4px)] w-[calc(100%-3rem-8px)] h-0.5" // Calculates line length for horizontal
    : "left-[1.4rem] top-8 h-full w-0.5" // Positions line vertically

  // Layout Classes for the Step
  const stepContainerClasses = direction === "horizontal"
    ? "relative flex flex-col items-center flex-1 text-center min-w-[180px] sm:min-w-[200px]"
    : "relative flex pb-8"

  // Card Content Classes
  const cardWrapperClasses = direction === "horizontal"
    ? "mt-12 w-full pt-4"
    : "ml-6 flex-1 pt-1"

  // Status Badge Logic
  const statusBadge = (
    <Badge
      className={
        isCompleted
          ? "bg-primary hover:bg-primary/90"
          : isError
            ? "bg-destructive hover:bg-destructive/90"
            : isInProgress
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
      }
    >
      {isCompleted ? "Completed" : isError ? "Error" : isInProgress ? "In Progress" : "Pending"}
    </Badge>
  )

  return (
    <div className={stepContainerClasses}>
      {/* 1. Line (Separator) before Icon (Only for Horizontal, to link the PREVIOUS step) */}
      {direction === "horizontal" && !isLast && (
        <Separator className={`${separatorBaseClasses} ${separatorColorClasses} ${separatorLayoutClasses} left-1/2`} />
      )}

      {/* 2. Icon Indicator */}
      <div className={`flex items-center justify-center p-2 rounded-full border-2 z-10 ${getIconContainerClasses()}`}>
        {isInProgress ? <Loader2 className={`${iconBaseClasses} animate-spin`} /> : <Icon className={iconBaseClasses} />}
      </div>

      {/* 3. Line (Separator) after Icon (Connects to the NEXT step) */}
      {!isLast && (
        <Separator
          className={`${separatorBaseClasses} ${separatorColorClasses} ${direction === "horizontal" ? separatorLayoutClasses : separatorLayoutClasses
            }`}
        />
      )}

      {/* 4. Content Card */}
      <div className={cardWrapperClasses}>
        <Card className="shadow-sm transition-shadow hover:shadow-md">
          <CardContent className="p-4">
            <div className={direction === "horizontal" ? "mb-2" : "flex items-center justify-between mb-1"}>
              <h3 className="font-semibold text-base sm:text-lg">{title}</h3>
              {direction === "vertical" && statusBadge}
            </div>
            {direction === "horizontal" && <div className="mb-2">{statusBadge}</div>}
            <p className="text-sm text-muted-foreground">{description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


// 2. Timeline Wrapper Component
interface TimelineProps {
  steps: TimelineStep[]
  direction?: TimelineDirection
  className?: string
}

export const Timeline: React.FC<TimelineProps> = ({ steps, direction = "vertical", className }) => {
  const containerClasses = direction === "horizontal"
    ? "flex justify-between items-start space-x-4 overflow-x-auto p-4" // Added overflow-x-auto for small screens
    : "space-y-0"

  // Determine if the previous step was completed for dynamic line coloring
  const stepsWithProgress = steps.map((step, index) => ({
    ...step,
    isPrevCompleted: index > 0 && (steps[index - 1].status === "completed" || steps[index - 1].status === "error"),
  }));

  return (
    <div className={`max-w-6xl mx-auto ${className}`}>
      <div className={containerClasses}>
        {stepsWithProgress.map((step, index) => (
          <TimelineItem
            key={step.id}
            step={step}
            direction={direction}
            isLast={index === steps.length - 1}
            isPrevCompleted={step.isPrevCompleted}
          />
        ))}
      </div>
    </div>
  )
}

// --- Export and Example Usage ---

