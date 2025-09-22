"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface BookingButtonProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export default function BookingButton({
  children,
  className,
  size = "default",
  variant = "default"
}: BookingButtonProps) {
  const router = useRouter();

  return (
    <Button
      size={size}
      variant={variant}
      className={className}
      onClick={() => router.push("/book-appointment")}
    >
      {children}
    </Button>
  );
}