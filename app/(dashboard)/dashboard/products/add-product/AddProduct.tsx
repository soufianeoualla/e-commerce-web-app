"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addProductSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Check, Loader } from "lucide-react";
import { getAllCategories, getSingleProduct } from "@/db/queries";
import Tiptap from "@/components/Dashboard/TipTap";
import { ImageUploader } from "@/components/Dashboard/ImageUploader";
import { Category } from "@prisma/client";
import { SelectedColors } from "@/components/Dashboard/SelectedColors";
import { SelectedSizes } from "@/components/Dashboard/SelectedSizes";
import { SelectedCategories } from "@/components/Dashboard/SelectedCategories";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { SingleProduct } from "@/lib/interfaces";
import { addProduct, editProduct } from "@/actions/products";
import toast from "react-hot-toast";

export const AddProduct = () => {
  const [product, setProduct] = useState<SingleProduct | null>();
  const [categories, setCategories] = useState<Category[]>();
  const [isPending, startTransition] = useTransition();
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const searchParms = useSearchParams();
  const slug = searchParms.get("slug");
  const router = useRouter();
  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      categories: [],
      colors: [],
      images: [],
      sizes: [],
      price: undefined,
      quantity: undefined,
      sku: undefined,
      description: "",
      slug: "",
      title: "",
    },
  });

  useEffect(() => {
    const getdata = async () => {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
      if (slug) {
        const productData = await getSingleProduct(slug);
        setProduct(productData);
        console.log(productData);
        if (productData) {
          setIsFeatured(productData.isFeatured);
          form.reset({
            title: productData.title,
            price: productData.price,
            categories: productData.categories.map((item) => ({
              category: item,
            })),
            slug: productData.slug,
            sku: productData.sku,
            description: productData.description,
            quantity: productData.quantity,
            images: productData.images.map((item) => ({ url: item.imageSrc })),
            colors: productData.colors.map((item) => ({ hexCode: item })),
            sizes: productData.sizes.map((item) => ({ size: item })),
          });
        }
      }
    };
    getdata();
  }, [slug, form]);

  const handleAddProduct = async (values: z.infer<typeof addProductSchema>) => {
    startTransition(async () => {
      let data;
      if (product) {
        data = await editProduct(values, isFeatured, product.id);
      } else {
        data = await addProduct(values, isFeatured);
      }
      if (data.success) {
        toast.success(data.success);
        router.back();
      }
      if (data.error) {
        toast.success(data.error);
      }
      form.reset();
    });
  };

  if (!categories)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  return (
    <>
      <div className=" bg-white rounded-lg border border-slate-100 z-20 w-full  ">
        <div className="px-12 py-8 flex justify-between items-center border-b border-b-slate-200">
          <h4 className="text-neutral-black font-medium text-[18px]">
            {product ? "Edit Product" : "Add Product"}
          </h4>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAddProduct)}
            className=" p-12 flex  gap-x-20 gap-y-4 relative mb-10 "
          >
            <div className="space-y-4 w-[320px]">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Tiptap
                        description={field.value}
                        onChange={field.onChange}
                        
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4 w-[320px]">
              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categories</FormLabel>
                    <FormControl>
                      <SelectedCategories
                        values={field.value}
                        categories={categories}
                        onChange={(category) =>
                          field.onChange([...field.value, { category }])
                        }
                        onRemove={(value) =>
                          field.onChange([
                            ...field.value.filter(
                              (category) => category.category !== value
                            ),
                          ])
                        }
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="colors"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Colors</FormLabel>
                      <FormControl>
                        <SelectedColors
                          values={field.value}
                          onChange={(hexCode) =>
                            field.onChange([...field.value, { hexCode }])
                          }
                          onRemove={(hexCode) =>
                            field.onChange([
                              ...field.value.filter(
                                (color) => color.hexCode !== hexCode
                              ),
                            ])
                          }
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sizes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sizes</FormLabel>
                      <FormControl>
                        <SelectedSizes
                          values={field.value}
                          onChange={(size) =>
                            field.onChange([...field.value, { size }])
                          }
                          onRemove={(size) =>
                            field.onChange([
                              ...field.value.filter(
                                (value) => value.size !== size
                              ),
                            ])
                          }
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <ImageUploader
                        values={field.value.map((image) => image.url)}
                        onChange={(url) =>
                          field.onChange([...field.value, { url }])
                        }
                        onRemove={(url) =>
                          field.onChange([
                            ...field.value.filter((image) => image.url !== url),
                          ])
                        }
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-x-2">
                <button
                  type="button"
                  onClick={() => setIsFeatured(!isFeatured)}
                  className={cn(
                    "w-6 h-6 rounded-sm border border-slate-300 flex justify-center items-center text-neutral-black font-medium",
                    isFeatured && "bg-neutral-black"
                  )}
                >
                  {" "}
                  {isFeatured && <Check className="w-4 h-4 text-white" />}
                </button>
                {"Is Featured"}
              </div>
            </div>

            <div className="absolute left-12 -bottom-6">
              <Button
                disabled={isPending}
                className="bg-neutral-black text-white font-medium h-11 rounded w-full mt-6 hover:bg-opacity-80"
              >
                {product ? "Edit Product" : "Add Product"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
