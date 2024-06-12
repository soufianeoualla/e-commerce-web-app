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
import { Dispatch, SetStateAction, useContext, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Check, Loader } from "lucide-react";
import { getAllCategories } from "@/db/queries";
import Tiptap from "@/components/Dashboard/TipTap";
import { ImageUploader } from "@/components/Dashboard/ImageUploader";
import {  Category } from "@prisma/client";
import { SelectedColors } from "@/components/Dashboard/SelectedColors";
import { SelectedSizes } from "@/components/Dashboard/SelectedSizes";
import { SelectedCategories } from "@/components/Dashboard/SelectedCategories";
import { cn } from "@/lib/utils";
import { addProduct } from "@/actions/addProduct";
import { SonnerContext } from "@/context/SonnerContext";


const AddProduct = () => {
  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      title: "",
      price: undefined,
      categories: [],
      slug: "",
      sku: undefined,
      description: "",
      quantity: undefined,
      images: [],
      colors: [],
      sizes: [],
    },
  });

  const [categories, setCategories] = useState<Category[]>();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const { handleSonner } = useContext(SonnerContext);

  useEffect(() => {
    const getdata = async () => {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
    };
    getdata();
  }, []);

  const handleAddProduct = (values: z.infer<typeof addProductSchema>) => {
    startTransition(() => {
      addProduct(values, isFeatured).then((data) => {
        setError(data.error);
        setSuccess(data.succes);
      });

      form.reset();
      handleSonner(success! || error!);
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
            Add Product
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
                Add Product
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default AddProduct;
