"use client";
import { addNewCatgeory } from "@/actions/dashboard";
import { FormError } from "@/components/auth/FormError";
import { FormSucces } from "@/components/auth/FormSucces";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useTransition } from "react";

export const AddCategory = () => {
  const [category, setCategory] = useState<string>("");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    if (!category) return setError("Category is required");
    startTransition(async () => {
      const data = await addNewCatgeory(category.toLowerCase());
      if (data.success) {
        setSuccess(data.success);
      } else {
        setError(data.error);
      }
    });
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">Add Category</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>
          <div className="grid items-center gap-y-2 mt-4">
            <Label>Category</Label>
            <Input
              disabled={isPending}
              type="text"
              placeholder="Category"
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          {error && <FormError message={error} />}
          {success && <FormSucces message={success} />}
          <DialogFooter className="">
            <Button
              disabled={isPending}
              onClick={handleSubmit}
              className="bg-neutral-black text-white font-medium px-4 rounded  mt-1"
            >
              Add Category{" "}
            </Button>{" "}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
