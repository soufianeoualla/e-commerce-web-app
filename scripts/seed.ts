import { db } from "@/db/db";
const { faker } = require("@faker-js/faker");

const categories = [
  "New Arrivals",
  "Hoodies",
  "Sweetshirts",
  "Athletic Wear",
  "t-shirts",
  "men",
  "women",
];

const main = async () => {
  await db.category.createMany({
    data: categories.map((item) => ({
      title: item,
    })),
  });
  const users = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      db.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          role: "user",
        },
      })
    )
  );

  // Generate Products
  const products = await Promise.all(
    Array.from({ length: 20 }).map(() =>
      db.product.create({
        data: {
          images: {
            create: Array.from({ length: 3 }).map(() => ({
              imageSrc: faker.image.imageUrl(),
            })),
          },
          title: faker.commerce.productName(),
          slug: faker.lorem.slug(),
          price: parseFloat(faker.commerce.price()),
          quantity: faker.datatype.number({ min: 1, max: 100 }),
          description: faker.lorem.paragraph(),
          sku: faker.datatype.number(),
          colors: faker.commerce.color(),
          sizes: faker.random.arrayElements(["S", "M", "L", "XL"]),
          categories: faker.random.arrayElements(categories),
          isFeatured: faker.datatype.boolean(),
        },
      })
    )
  );

  // Generate Orders
  const orders = await Promise.all(
    Array.from({ length: 5 }).map(async () => {
      const userId =
        users[faker.datatype.number({ min: 0, max: users.length - 1 })].id;

      // Create Shipping Address first
      const shippingAddress = await db.shippingAddress.create({
        data: {
          streetAddress: faker.address.streetAddress(),
          city: faker.address.city(),
          state: faker.address.state(),
          country: faker.address.country(),
          zipCode: faker.address.zipCode(),
          email: faker.internet.email(),
          fullName: faker.person.fullName(),
        },
      });

      return db.order.create({
        data: {
          userId: userId,
          amount: parseFloat(faker.commerce.price()),
          isPaid: faker.datatype.boolean(),
          shippingAddressId: shippingAddress.id,
          orderItems: {
            create: products.slice(0, 3).map((product) => ({
              productId: product.id,
              quantity: faker.datatype.number({ min: 1, max: 5 }),
              color: faker.commerce.color(),
              size: faker.random.arrayElement(["S", "M", "L", "XL"]),
            })),
          },
        },
      });
    })
  );

  // Generate Reviews
  const reviews = await Promise.all(
    Array.from({ length: 15 }).map(() =>
      db.review.create({
        data: {
          productId:
            products[
              faker.datatype.number({ min: 0, max: products.length - 1 })
            ].id,
          userId:
            users[faker.datatype.number({ min: 0, max: users.length - 1 })].id,
          rating: faker.datatype.number({ min: 1, max: 5 }),
          text: faker.lorem.paragraph(),
        },
      })
    )
  );

  console.log("Seeding finished.");
};
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
