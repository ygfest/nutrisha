"use client";

import { useQuery } from "@tanstack/react-query";
import { getClients } from "@/actions/clients";
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

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export function ClientsTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["clients"],
    queryFn: () => getClients(),
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
              <div className="h-4 bg-gray-200 w-1/6"></div>
              <div className="h-4 bg-gray-200 w-1/6"></div>
              <div className="h-4 bg-gray-200 w-1/6"></div>
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((client: Client) => (
              <TableRow key={client.id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
