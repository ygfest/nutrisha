"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getClients, deleteClient } from "@/actions/clients";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { UserX } from "lucide-react";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export function ClientsTable() {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { data, isLoading, error } = useQuery({
    queryKey: ["clients"],
    queryFn: () => getClients(),
  });

  const { mutate: deleteClientMutation, isPending } = useMutation({
    mutationFn: (id: string) => deleteClient(id),
    onMutate: (id: string) => {
      setDeletingId(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      setDeletingId(null);
    },
    onError: (error) => {
      toast.error(error.message);
      setDeletingId(null);
    },
  });

  const TableSkeleton = () => {
    return (
      <Card className="border-sage-100">
        <CardHeader>
          <CardTitle>Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="flex items-center space-x-48">
              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
            </div>

            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-8">
                <div className="rounded-full bg-gray-200 h-8 w-8"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"> </div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };
  return isLoading ? (
    <TableSkeleton />
  ) : (
    <Card>
      <CardHeader>
        <CardTitle>Clients</CardTitle>
      </CardHeader>
      <CardContent>
        {data?.length === 0 ? (
          <div className="text-center py-8">
            <UserX className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No clients found</p>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((client: Client) => (
                  <TableRow key={client.id}>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell>
                      <Button
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => deleteClientMutation(client.id)}
                        disabled={isPending && deletingId === client.id}
                      >
                        {isPending && deletingId === client.id ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-sage-600 mr-2"></div>
                            Deleting...
                          </>
                        ) : (
                          "Delete"
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </CardContent>
    </Card>
  );
}
