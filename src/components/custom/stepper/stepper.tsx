import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface StepperProps {
  steps: {
    label: string;
  }[];
  currentStep: number;
  onStepChange: (step: number) => void;
  content: React.ReactNode;
}

export function Stepper({ steps, currentStep, onStepChange, content }: StepperProps) {
  const nextStep = () => {
    onStepChange(Math.min(currentStep + 1, steps.length - 1));
  };

  const prevStep = () => {
    onStepChange(Math.max(currentStep - 1, 0));
  };

  return (
    <Card className="p-2 max-w-2xl mx-auto my-2 border-0">
      {/* Stepper progress indicator */}
      <div className="flex justify-between items-center mb-6">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center relative">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transition-colors duration-300',
                  {
                    'bg-blue-600': index <= currentStep,
                    'bg-gray-300': index > currentStep,
                  }
                )}
              >
                {index + 1}
              </div>
              <p className="mt-2 text-sm text-center">{step.label}</p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn('flex-1 h-0.5 transition-colors duration-300 mx-2', {
                  'bg-blue-600': index < currentStep,
                  'bg-gray-300': index >= currentStep,
                })}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <CardContent>
        <div>{content}</div>
      </CardContent>

      <div className="mt-6 flex justify-between">
        <Button onClick={prevStep} disabled={currentStep === 0} type="button">
          Previous
        </Button>
        {
          currentStep == steps.length - 1 ?
            <Button type="submit">Submit</Button>
            :
            <Button onClick={nextStep} type="button">Next</Button>
        }
      </div>
    </Card>
  );
}
