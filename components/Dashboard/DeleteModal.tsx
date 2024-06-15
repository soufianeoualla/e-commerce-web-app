"use client";
import {
  deleteCustomer,
  deleteOrder,
  deleteProduct,
  deleteReview,
} from "@/actions/dashboard";
import { Button } from "@/components/ui/button";
import { useTransition, type Dispatch, type SetStateAction } from "react";
import { useToast } from "../ui/use-toast";

type Props = {
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
  id: string;
  type: "order" | "product" | "customer" | "review";
};

export const DeleteModal = ({ setDeleteModal, id, type }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const onDelete = () => {
    setDeleteModal(false);
    startTransition(async () => {
      let data;

      switch (type) {
        case "order":
          data = await deleteOrder(id);
          break;
        case "product":
          data = await deleteProduct(id);
          break;
        case "review":
          data = await deleteReview(id);
          break;
        case "customer":
          data = await deleteCustomer(id);
          break;
        default:
          throw new Error("Invalid type");
      }

      if (data.success) {
        toast({
          variant: "default",
          description: data.success,
        });
      } else {
        toast({
          variant: "destructive",
          description: data.error,
        });
      }
    });
  };

  return (
    <>
      <div
        onClick={() => setDeleteModal(false)}
        className="fixed inset-0 w-full h-full  z-40 bg-primary/70"
      ></div>
      <div className="w-[480px] absolute top-[20%] left-1/2 -translate-x-1/2 translate-y-1/2  rounded-lg p-8 z-50 bg-white  ">
        <h1 className="text-xl font-bold mb-3 text-primary ">
          Confirm Deletion
        </h1>
        <p className="text-[13px] text-neutral-500">
          Are you sure you want to delete this{" "}
          <span className="font-bold capitalize"> {type} </span>, This action
          cannot be undone.
        </p>
        <div className="flex justify-end items-center mt-8 gap-x-2">
          <Button
            disabled={isPending}
            onClick={() => setDeleteModal(false)}
            variant={"ghost"}
            className="text-base  h-10 w-[89px]  hover:bg-transparent font-bold  "
          >
            Cancel
          </Button>
          <Button
            disabled={isPending}
            onClick={onDelete}
            variant={"destructive"}
            className="text-base   h-10 w-[89px] font-bold  text-white "
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};
