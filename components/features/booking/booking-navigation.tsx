import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BookingStep } from "@/types/booking";

interface BookingNavigationProps {
  currentStep: BookingStep;
  canGoNext: boolean;
  canGoBack: boolean;
  onNext: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export function BookingNavigation({
  currentStep,
  canGoNext,
  canGoBack,
  onNext,
  onBack,
  isSubmitting,
}: BookingNavigationProps) {
  // Don't show navigation for form step (has its own submit) or confirmation
  if (currentStep === "form" || currentStep === "confirmation") {
    return null;
  }

  return (
    <div className="flex justify-between mt-8">
      <BackButton
        canGoBack={canGoBack}
        onBack={onBack}
        isSubmitting={isSubmitting}
      />
      <NextButton
        canGoNext={canGoNext}
        onNext={onNext}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

interface BackButtonProps {
  canGoBack: boolean;
  onBack: () => void;
  isSubmitting: boolean;
}

function BackButton({ canGoBack, onBack, isSubmitting }: BackButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onBack}
      disabled={!canGoBack || isSubmitting}
      className="flex items-center space-x-2"
    >
      <ArrowLeft className="h-4 w-4" />
      <span>Back</span>
    </Button>
  );
}

interface NextButtonProps {
  canGoNext: boolean;
  onNext: () => void;
  isSubmitting: boolean;
}

function NextButton({ canGoNext, onNext, isSubmitting }: NextButtonProps) {
  return (
    <Button
      onClick={onNext}
      disabled={!canGoNext || isSubmitting}
      className="flex items-center space-x-2"
    >
      <span>Next</span>
      <ArrowRight className="h-4 w-4" />
    </Button>
  );
}