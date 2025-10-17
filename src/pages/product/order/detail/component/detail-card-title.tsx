import type React from "react";

interface DetailCardTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const DetailCardTitle = ({
  children,
  className,
  ...props
}: DetailCardTitleProps) => {
  return (
    <div
      className={`flex gap-6 items-center ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  )
}
