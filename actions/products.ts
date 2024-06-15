"use server";

import { auth } from "@/auth";
import { db } from "@/db/db";
import { addProductSchema } from "@/schemas";
import { z } from "zod";

export const addProduct = async (
  values: z.infer<typeof addProductSchema>,
  isFeatured: boolean
) => {
  const session = await auth();
  const user = session?.user;
  if (!user || user.role !== "admin") return { error: "Your not allowed" };
  const validateFields = addProductSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "invalid fields" };
  }
  const {
    title,
    slug,
    price,
    sku,
    quantity,
    description,
    categories,
    colors,
    images,
    sizes,
  } = validateFields.data;

  const existingProduct = await db.product.findUnique({
    where: {
      slug,
    },
  });

  if (existingProduct)
    return {
      error: "A product already exist with this slug, Please change the slug ",
    };

  await db.product.create({
    data: {
      title,
      price,
      description,
      isFeatured,
      quantity,
      sku,
      slug: slug.toLowerCase(),
      categories: categories.map((item) => item.category),
      colors: colors.map((item) => item.hexCode),
      sizes: sizes.map((item) => item.size),
      images: {
        createMany: {
          data: images.map((image) => ({
            imageSrc: image.url,
          })),
        },
      },
    },
  });
  return { success: "Product added successfully " };
};

export const editProduct = async (
  values: z.infer<typeof addProductSchema>,
  isFeatured: boolean,
  id: string
) => {
  const session = await auth();
  const user = session?.user;
  if (!user || user.role !== "admin") return { error: "Your not allowed" };
  const validateFields = addProductSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "invalid fields" };
  }
  const {
    title,
    slug,
    price,
    sku,
    quantity,
    description,
    categories,
    colors,
    images,
    sizes,
  } = validateFields.data;

  const product = await db.product.findUnique({
    where: {
      slug,
    },
  });

  if (product)
    return {
      error: "A product already exist with this slug, Please change the slug ",
    };

  await db.product.update({
    where: { id },
    data: {
      title,
      price,
      description,
      isFeatured,
      quantity,
      sku,
      slug: slug.toLowerCase(),
      categories: categories.map((item) => item.category),
      colors: colors.map((item) => item.hexCode),
      sizes: sizes.map((item) => item.size),
      images: {
        updateMany: {
          where: {
            productId: id,
          },
          data: images.map((image) => ({
            imageSrc: image.url,
          })),
        },
      },
    },
  });
  return { success: "The product has been edited successfully " };
};
