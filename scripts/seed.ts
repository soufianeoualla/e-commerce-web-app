import { db } from "@/db/db";


const categories = [
  "New Arrivals",
  "Hoodies",
  "Sweetshirts",
  "Athletic Wear",
  "Basic Tees",
  "Graphic Tees",
];

const main = async () => {

  await db.category.createMany({
    data: categories.map((item) => ({
      title: item,
    })),
  });

  
};
main();
