import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import * as React from 'react'; // Import React for utility types and functions
import { DetailCardTitle } from './detail-card-title'; // Assuming this is defined in a separate file

interface DetailCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
const DetailCardHeader = React.forwardRef<HTMLDivElement, DetailCardHeaderProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref} {...props}>
      {children}
    </div>
  )
);
DetailCardHeader.displayName = 'DetailCardHeader';


interface DetailCardRootProps extends React.ComponentPropsWithoutRef<typeof Card> {
  children: React.ReactNode,
}

export const DetailCard = ({ children, ...props }: DetailCardRootProps) => {
  const header = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === DetailCard.Header
  );

  const content = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type !== DetailCard.Header
  );

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>
          {header}
        </CardTitle>
      </CardHeader>

      <Separator />

      {/* RENDER THE CONTENT */}
      <CardContent>
        {content}
      </CardContent>
    </Card>
  )
}

DetailCard.Header = DetailCardHeader;
DetailCard.Title = DetailCardTitle;
