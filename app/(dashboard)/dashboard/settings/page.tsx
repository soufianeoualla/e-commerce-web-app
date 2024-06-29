"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState, useTransition } from "react";
import { addUser, setOrderGoal } from "@/actions/dashboard";
import { OrderGoal } from "@prisma/client";
import { getOrdersGaol } from "@/db/queries";
import toast from "react-hot-toast";

const Page = () => {
  const [isPending, startTransition] = useTransition();
  const [goal, setGoal] = useState<number | null>();
  const [currentGoal, setCurrentGoal] = useState<OrderGoal | null>();
  const [email, setEmail] = useState<string>("");
  useEffect(() => {
    const getData = async () => {
      const data = await getOrdersGaol();
      setCurrentGoal(data);
    };
    getData();
  }, []);

  const onAddUser = () => {
    if (email) return toast.error("Email is required");
    startTransition(async () => {
      const data = await addUser(email);
      if (data.success) {
        toast.success(data.success);
      } else if (data.error) {
        toast.error(data.error);
      }
    });
  };
  const onSave = () => {
    if (!goal) return toast.error("Goal is required");

    const id = currentGoal?.id || 123;
    startTransition(async () => {
      const data = await setOrderGoal(id, goal);
      if (data.success) {
        toast.success(data.success);
      } else if (data.error) {
        toast.error(data.error);
      }
    });
  };
  return (
    <div className="w-full bg-white rounded-lg border border-slate-200 h-full p-8">
      <div className="flex justify-between items-center mb-20">
        <h3 className="text-neutral-black font-medium text-[18px]">Settings</h3>
      </div>
      <h3 className="text-neutral-black font-medium text-[14px] capitalize">
        set a Monthly Order Goal
      </h3>
      <div className="w-[300px]">
        <Label>Monthly Order Goal</Label>
        <Input
          disabled={isPending}
          type="number"
          min={1}
          className="mt-2 mb-4"
          onChange={(e) => setGoal(parseInt(e.target.value))}
        />
        <Button onClick={onSave} disabled={isPending}>
          Save Changes
        </Button>
      </div>

      <div className="space-y-4 w-[300px] mt-8">
        <h3 className="text-neutral-black font-medium text-[14px]">
          Add New Admin
        </h3>
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            disabled={isPending}
            className="h-10"
            id="email"
            type="email"
            placeholder="mail@soufian.me"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex items-end gap-4 sm:flex-wrap w-full">
          <Button onClick={onAddUser} disabled={isPending}>
            Add User
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
