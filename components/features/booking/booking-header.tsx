import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";
import { BookingStepConfig, BookingStep } from "@/types/booking";

interface BookingHeaderProps {
  steps: BookingStepConfig[];
  currentStepIndex: number;
  progress: number;
  onStepClick?: (stepId: BookingStep) => void;
}

export function BookingHeader({ steps, currentStepIndex, progress, onStepClick }: BookingHeaderProps) {
  return (
    <header className="bg-white border-b border-sage-100 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Book Your Nutrition Consultation
            </h1>
            <p className="text-gray-600 mt-1">
              Schedule your personalized session with Krisha Nobora, RND
            </p>
          </div>
          <Badge variant="outline" className="text-sage-600 border-sage-200 white-space-nowrap">
            Step {currentStepIndex + 1} of {steps.length}
          </Badge>
        </div>

        <div className="space-y-4">
          <Progress value={progress} className="h-2" />
          <BookingSteps steps={steps} currentStepIndex={currentStepIndex} onStepClick={onStepClick} />
        </div>
      </div>
    </header>
  );
}

interface BookingStepsProps {
  steps: BookingStepConfig[];
  currentStepIndex: number;
  onStepClick?: (stepId: BookingStep) => void;
}

function BookingSteps({ steps, currentStepIndex, onStepClick }: BookingStepsProps) {
  return (
    <div className="flex items-center justify-between text-sm">
      {steps.map((step, index) => {
        const StepIcon = step.icon;
        const isActive = index === currentStepIndex;
        const isCompleted = index < currentStepIndex;
        const isClickable = isCompleted; // Only completed steps are clickable

        const handleClick = () => {
          if (isClickable && onStepClick) {
            onStepClick(step.id as BookingStep);
          }
        };

        return (
          <div
            key={step.id}
            onClick={handleClick}
            className={`flex items-center space-x-2 transition-all duration-200 ${
              isActive
                ? "text-sage-600 font-semibold"
                : isCompleted
                ? "text-green-600"
                : "text-gray-400"
            } ${
              isClickable
                ? "cursor-pointer hover:scale-105 hover:bg-green-50 rounded-lg p-2 -m-2"
                : "cursor-default"
            }`}
          >
            <StepIndicator
              isActive={isActive}
              isCompleted={isCompleted}
              isClickable={isClickable}
              icon={StepIcon}
            />
            <div className="hidden sm:block">
              <div className="font-medium">{step.title}</div>
              <div className={`text-xs ${isClickable ? "text-green-500" : "text-gray-500"}`}>
                {isClickable ? "Click to edit" : step.description}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface StepIndicatorProps {
  isActive: boolean;
  isCompleted: boolean;
  isClickable: boolean;
  icon: any;
}

function StepIndicator({ isActive, isCompleted, isClickable, icon: Icon }: StepIndicatorProps) {
  const baseClasses = "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200";

  const variantClasses = isActive
    ? "bg-sage-100 text-sage-600"
    : isCompleted
    ? `bg-green-100 text-green-600 ${isClickable ? "hover:bg-green-200 hover:shadow-md" : ""}`
    : "bg-gray-100 text-gray-400";

  return (
    <div className={`${baseClasses} ${variantClasses}`}>
      {isCompleted ? (
        <CheckCircle className="h-4 w-4" />
      ) : (
        <Icon className="h-4 w-4" />
      )}
    </div>
  );
}