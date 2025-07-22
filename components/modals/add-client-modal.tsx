import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AddClientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddClientModal({
  open,
  onOpenChange,
}: AddClientModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Use shared mutation hook to keep logic DRY
  const { mutate: submitClient, isPending } = useAddClient();

  const handleSubmit = () => {
    if (!name || !email) {
      toast({ title: "Name and email are required" });
      return;
    }
    submitClient(
      { name, email, phone },
      {
        onSuccess: () => {
          // The hook already shows a toast and invalidates cache.
          // Handle modal-local side-effects here.
          //toast({ title: "Client added successfully" });
          setName("");
          setEmail("");
          setPhone("");
          onOpenChange(false);
        },
        onError: (err: any) => {
          toast({ title: err?.message || "Failed to add client" });
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogDescription>
            Create a new client profile by providing basic contact information.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function useAddClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
    }: {
      name: string;
      email: string;
      phone: string;
    }) => {
      const res = await fetch("/api/clients/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to add client");
      }
      return json;
    },
    onSuccess: () => {
      toast({
        description: "Client added successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
}
