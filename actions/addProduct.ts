"use server";

import { db } from "@/db/db";
import { addProductSchema } from "@/schemas";
import { z } from "zod";

export const addProduct = async (
  values: z.infer<typeof addProductSchema>,
  isFeatured: boolean
) => {
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
  return { succes: "Product added successfully " };
};
