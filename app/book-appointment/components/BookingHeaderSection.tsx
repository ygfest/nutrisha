import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";

interface Step {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface BookingHeaderSectionProps {
  steps: Step[];
  currentStep: string;
  progress: number;
}

export default function BookingHeaderSection({
  steps,
  currentStep,
  progress,
}: BookingHeaderSectionProps) {
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <header className="bg-white border-b border-sage-100 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Book Your Appointment
            </h1>
            <p className="text-gray-600">
              Schedule your personalized nutrition consultation
            </p>
          </div>
          <Badge className="bg-sage-100 text-sage-800 px-4 py-2">
            Step {currentStepIndex + 1} of {steps.length}
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <Progress value={progress} className="h-2 bg-sage-100" />
          <div className="flex justify-between mt-4">
            {steps.map((step, index) => {
              const isActive = step.id === currentStep;
              const isCompleted = index < currentStepIndex;
              const IconComponent = step.icon;

              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center mb-2 transition-colors ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : isActive
                          ? "bg-sage-500 text-white"
                          : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <IconComponent className="h-5 w-5" />
                    )}
                  </div>
                  <div className="text-center">
                    <div
                      className={`text-sm font-medium ${
                        isActive ? "text-sage-600" : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-400 hidden sm:block">
                      {step.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}