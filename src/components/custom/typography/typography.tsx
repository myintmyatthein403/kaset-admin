interface StatusTextWithCircleProps {
  status: string;
  text: string;
}

export const StatusTextWithCircle = ({ status, text }: StatusTextWithCircleProps) => {
  let textColorClass = 'text-gray-700';
  let circleColorClass = 'bg-gray-400';
  console.log(status)
  switch (status) {
    case 'success':
      textColorClass = 'text-green-600';
      circleColorClass = 'bg-green-500';
      break;
    case 'pending':
      textColorClass = 'text-yellow-600';
      circleColorClass = 'bg-yellow-500';
      break;
    case 'failed':
      textColorClass = 'text-red-600';
      circleColorClass = 'bg-red-500';
      break;
    case 'info':
      textColorClass = 'text-blue-600';
      circleColorClass = 'bg-blue-500';
      break;
    default:
      textColorClass = 'text-gray-700';
      circleColorClass = 'bg-gray-400';
  }
  return (
    <div className="flex items-center space-x-2"> {/* Use flexbox to align circle and text */}
      <div
        className={`w-2.5 h-2.5 rounded-full ${circleColorClass}`} // Circle styles
        aria-hidden="true" // Hide from screen readers if purely decorative
      ></div>
      <span className={textColorClass}>
        {text}
      </span>
    </div>
  );
}
