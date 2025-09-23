import { AppointmentTypes } from "@/components/appointment-types";

interface AppointmentTypeSectionProps {
  selectedType: string | null;
  onTypeSelect: (type: string) => void;
}

export default function AppointmentTypeSection({
  selectedType,
  onTypeSelect,
}: AppointmentTypeSectionProps) {
  return (
    <AppointmentTypes
      selectedType={selectedType}
      onTypeSelect={onTypeSelect}
    />
  );
}