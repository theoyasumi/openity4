"use client";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "@/components/icons";
import { type Locksmith } from "@/lib/types/locksmith";
import { useState } from "react";
import Link from "next/link";

interface LocksmithsTableProps {
  data: Locksmith[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function LocksmithsTable({ data, onEdit, onDelete }: LocksmithsTableProps) {
  // Typage explicite pour éviter l'erreur
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns: ColumnDef<Locksmith>[] = [
    {
      accessorKey: "name",
      header: "Nom",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Téléphone",
    },
    {
      accessorKey: "cities",
      header: "Villes",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {row.original.cities.slice(0, 3).map((city) => (
            <span
              key={city}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-accent"
            >
              {city}
            </span>
          ))}
          {row.original.cities.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{row.original.cities.length - 3}
            </span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "workingHours.is24h",
      header: "Disponibilité",
      cell: ({ row }) => (
        <span className={row.original.workingHours.is24h ? "text-green-600" : "text-yellow-600"}>
          {row.original.workingHours.is24h ? "24h/24" : "Horaires standards"}
        </span>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link href={`/serrurier/${row.original.id}`}>
            <Button variant="outline" size="sm">
              Voir
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(row.original.id!)}
          >
            Modifier
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(row.original.id!)}
          >
            Supprimer
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Rechercher..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-sm font-medium"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={`flex items-center gap-2 ${
                          header.column.getCanSort() ? "cursor-pointer select-none" : ""
                        }`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
