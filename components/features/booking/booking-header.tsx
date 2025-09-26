import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";
import { BookingStepConfig } from "@/types/booking";

interface BookingHeaderProps {
  steps: BookingStepConfig[];
  currentStepIndex: number;
  progress: number;
}

export function BookingHeader({ steps, currentStepIndex, progress }: BookingHeaderProps) {
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
          <Badge variant="outline" className="text-sage-600 border-sage-200">
            Step {currentStepIndex + 1} of {steps.length}
          </Badge>
        </div>

        <div className="space-y-4">
          <Progress value={progress} className="h-2" />
          <BookingSteps steps={steps} currentStepIndex={currentStepIndex} />
        </div>
      </div>
    </header>
  );
}

interface BookingStepsProps {
  steps: BookingStepConfig[];
  currentStepIndex: number;
}

function BookingSteps({ steps, currentStepIndex }: BookingStepsProps) {
  return (
    <div className="flex items-center justify-between text-sm">
      {steps.map((step, index) => {
        const StepIcon = step.icon;
        const isActive = index === currentStepIndex;
        const isCompleted = index < currentStepIndex;

        return (
          <div
            key={step.id}
            className={`flex items-center space-x-2 ${
              isActive
                ? "text-sage-600 font-semibold"
                : isCompleted
                ? "text-green-600"
                : "text-gray-400"
            }`}
          >
            <StepIndicator
              isActive={isActive}
              isCompleted={isCompleted}
              icon={StepIcon}
            />
            <div className="hidden sm:block">
              <div className="font-medium">{step.title}</div>
              <div className="text-xs text-gray-500">{step.description}</div>
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
  icon: any;
}

function StepIndicator({ isActive, isCompleted, icon: Icon }: StepIndicatorProps) {
  const baseClasses = "w-8 h-8 rounded-full flex items-center justify-center";

  const variantClasses = isActive
    ? "bg-sage-100 text-sage-600"
    : isCompleted
    ? "bg-green-100 text-green-600"
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