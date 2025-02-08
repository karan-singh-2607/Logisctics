interface StepIndicatorProps {
    totalSteps: number
    currentStep: number
  }
  
  export function StepIndicator({ totalSteps, currentStep }: StepIndicatorProps) {
    return (
      <div className="flex gap-2 absolute -top-10 right-6">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentStep ? 'bg-secondary' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }
  
  