import { db } from "@/db/db";
const { faker } = require("@faker-js/faker");

const main = async () => {
  await db.orderGoal.create({
    data: {
      goal: 500,
    },
  });

  const users = await Promise.all(
    Array.from({ length: 20 }).map(() =>
      db.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          role: "user",
          image: faker.image.avatar(),
        },
      })
    )
  );

  const products = [
    { id: "0f4a6640-7ba6-4cc0-9d16-af991ab91fdf" },
    { id: "51d004d5-52ff-43bb-a944-a667077babb3" }, 
    { id: "7a1690eb-34b9-40c8-9305-8e8425eb6db6" },
    { id: "1f149a02-0ae7-4dee-bf62-a4ead6f2d964" },
  ];

  const orders = await Promise.all(
    Array.from({ length: 20 }).map(async () => {
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
          updatedAt: faker.date.between({
            from: "2024-06-01T00:00:00.000Z",
            to: "2024-06-14T00:00:00.000Z",
          }),
          ref: faker.commerce.isbn(),
          userId: userId,
          amount: parseFloat(faker.commerce.price()),
          isPaid: faker.datatype.boolean(),
          shippingAddressId: shippingAddress.id,
          orderItems: {
            create: products.slice(0, 3).map((product) => ({
              productId: product.id,
              quantity: faker.datatype.number({ min: 1, max: 5 }),
              color: faker.color.hsl({ format: "css" }),
              size: "S",
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
