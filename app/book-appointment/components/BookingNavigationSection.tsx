import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface BookingNavigationSectionProps {
  currentStep: string;
  onBack: () => void;
  onNext: () => void;
  canProceedToDateTime: boolean;
  canProceedToForm: boolean;
}

export default function BookingNavigationSection({
  currentStep,
  onBack,
  onNext,
  canProceedToDateTime,
  canProceedToForm,
}: BookingNavigationSectionProps) {
  if (currentStep === "confirmation") {
    return null;
  }

  return (
    <div className="flex justify-between items-center mt-12 max-w-4xl mx-auto">
      <Button
        variant="outline"
        onClick={onBack}
        disabled={currentStep === "type"}
        className="border-sage-200 text-sage-700 hover:bg-sage-50"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      {currentStep !== "form" && (
        <Button
          onClick={onNext}
          disabled={
            (currentStep === "type" && !canProceedToDateTime) ||
            (currentStep === "datetime" && !canProceedToForm)
          }
          className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white"
        >
          Continue
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      )}
    </div>
  );
}