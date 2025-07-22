"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function AddClientModal() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  async function addClient() {
    const res = await fetch("/api/clients/add", {
      method: "POST",
      body: JSON.stringify({ name, email, phone }),
    });
    if (!res.ok) {
      throw new Error("Failed to add client");
    }
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      await addClient();
    },
    onSuccess: () => {
      toast({
        title: "Client added successfully",
        description: "Client added successfully",
      });
    },
    onError: () => {
      toast({
        title: "Failed to add client",
        description: "Failed to add client",
      });
    },
  });

  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Client</DialogTitle>
          <DialogDescription>Add a new client to the system.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={name}
              required
              placeholder="Enter name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
          </div>
          <div>
            <Label htmlFor="email">Email*</Label>
            <Input
              id="email"
              value={email}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              value={phone}
              required
              placeholder="Enter phone"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPhone(e.target.value)
              }
            />
          </div>
          <Button type="submit" disabled={isLoading} onClick={handleSubmit}>
            {isLoading ? "Adding..." : "Add Client"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
