"use server";

import { auth } from "@/auth";
import { db } from "@/db/db";
import { getUserbyEmail } from "@/db/user";

export const deleteOrder = async (id: string) => {
  const session = await auth();
  const user = session?.user;
  if (!user || user.role !== "admin") return { error: "Your not allowed" };

  const order = await db.order.findUnique({
    where: {
      id,
    },
  });
  if (!order) return { error: "Order does not exist " };
  await db.orderItem.deleteMany({
    where: {
      orderId: id,
    },
  });
  await db.order.delete({
    where: {
      id,
    },
  });
  return { success: "Order has been deleted successfully" };
};

export const setOrderGoal = async (id: number, goal: number) => {
  const session = await auth();
  const user = session?.user;
  if (!user || user.role !== "admin") return { error: "Your not allowed" };
  const existingGoal = await db.orderGoal.findFirst({
    where: {
      id,
    },
  });
  if (existingGoal) {
    await db.orderGoal.update({
      where: {
        id,
      },
      data: {
        goal,
      },
    });
  } else {
    await db.orderGoal.create({
      data: {
        goal,
      },
    });
  }
  return { success: "Your Goal has been settled successfully" };
};

export const addNewCatgeory = async (category: string) => {
  const session = await auth();
  const user = session?.user;
  if (!user || user.role !== "admin") return { error: "Your not allowed" };
  const existingCategory = await db.category.findUnique({
    where: {
      title: category,
    },
  });
  if (existingCategory) return { error: "Category already exist" };
  await db.category.create({
    data: {
      title: category,
    },
  });
  return { success: "Your category has been added successfully" };
};
export const deleteProduct = async (id: string) => {
  const session = await auth();
  const user = session?.user;
  if (!user || user.role !== "admin") return { error: "Your not allowed" };
  const product = await db.product.findUnique({
    where: { id },
  });
  if (!product) return { error: "Product does not exist" };
  await db.product.delete({
    where: {
      id,
    },
  });
  return { success: "The product has been deleted successfully" };
};


export const deleteCategory = async (id: number) => {
  const session = await auth();
  const user = session?.user;
  if (!user || user.role !== "admin") return { error: "Your not allowed" };
  const category = await db.category.findUnique({
    where: {
      id,
    },
  });
  if (!category) return { error: "Category does not exist" };
  await db.category.delete({
    where: {
      id,
    },
  });
  return { success: "Category has been deleted successfully" };
};

export const deleteReview = async (id: string) => {
  const session = await auth();
  const user = session?.user;
  if (!user || user.role !== "admin") return { error: "Your not allowed" };
  const review = await db.review.findUnique({
    where: {
      id,
    },
  });
  if (!review) return { error: "Review does not exist" };
  await db.review.delete({
    where: {
      id,
    },
  });
  return { success: "Review has been deleted successfully" };
};

export const deleteCustomer = async (id: string) => {
  const session = await auth();
  const user = session?.user;
  if (!user || user.role !== "admin") return { error: "Your not allowed" };
  const customer = await db.shippingAddress.findUnique({
    where: {
      id,
    },
  });
  if (!customer) return { error: "customer does not exist" };
  await db.shippingAddress.delete({
    where: {
      id,
    },
  });
  const existingUser = await getUserbyEmail(customer.email);
  if (existingUser) {
    await db.user.delete({
      where: {
        id: existingUser.id,
      },
    });
  }
  return { success: "customer has been deleted successfully" };
};



export const addUser = async (
  email:string
) => {
  const session = await auth();
  const user = session?.user;
  if (!user || user.role !== "admin") return {error:'Your not allowed'};

  const existingUser = await getUserbyEmail(email);
  if (!existingUser) return { error: "User not found" };
  
  await db.user.update({
    where:{
        id:existingUser.id
    },
    data: {
      role: "admin",
    },
  });
  return { success: "The role of the user has been changed successfully" };
};