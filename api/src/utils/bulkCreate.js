const axios = require("axios");
const { Op } = require("sequelize");
const { Product, Color, Size, Attribute, Variation, Review } = require("../db");
const { bulkSizesInDB, bulkColorsInDB } = require("../services/getAttributes");

const { getApiProducts } = require("../services/getProducts");
const products = require("../utils/products.json");
const reviews = require("../utils/reviews.json");

const createProduct = async (product) => {
  const productCreated = await Product.create({
    title: product.title,
    price: product.price,
    sold_quantity: product.sold_quantity,
    condition: product.condition,
    pictures: product.pictures,
    available_quantity: product.available_quantity,
  });
  return productCreated;
};

const createReview = async (review) => {};

const bulkCreate = async () => {
  const productsOnDatabase = await Product.findAll();

  if (productsOnDatabase.length) {
    console.log("Product already on database");
    return;
  } else {
    await bulkColorsInDB();
    await bulkSizesInDB();

    // const dataToBulk = await getApiProducts();
    const dataToBulk = products;

    let index = 0;
    while (index < dataToBulk.length && index < 80) {
      const batch = dataToBulk.slice(index, index + 10);
      for (const product of batch) {
        const productCreated = await createProduct(product);

        if (reviews[index].reviews.length) {
          reviews[index].reviews.forEach(async (review) => {
            const newReview = await Review.create({
              title: review.title,
              content: review.content,
              rate: review.rate,
            });

            await productCreated.addReview(newReview);
          });
        }

        product.attributes.forEach(async (attr) => {
          const attribute = await Attribute.create({
            name: attr.value_name,
            value: attr.name,
          });
          return await productCreated.addAttributes(attribute);
          // }
        });

        if (product.variations.length) {
          product.variations.forEach(async (variation) => {
            const { price, sold_quantity, available_quantity, picture_ids } =
              variation;

            const variationCreated = await Variation.create({
              price,
              sold_quantity,
              available_quantity,
              picture_ids: picture_ids.map(
                (picture) => `https://http2.mlstatic.com/D_${ picture}-O.jpg`
              ),
            });

            await variationCreated.setProduct(productCreated);

            variation.attribute_combinations.forEach(async (attr) => {
              if (attr.id === "COLOR") {
                const color = attr.value_name;
                const colorOnDb = await Color.findOrCreate({
                  where: { name: color },
                  defaults: { name: color },
                });
                return await variationCreated.setColor(colorOnDb[0]);
              } else if (attr.id === "SIZE") {
                const size = attr.value_name.split(" ")[0];
                const sizeOnDb = await Size.findOrCreate({
                  where: { value: size },
                  defaults: { value: size },
                });
                return await variationCreated.setSize(sizeOnDb[0]);
              }
            });
          });
        }
      }
      index += 10;
    }
  }
  console.log("Products succesfully created on db");
};

module.exports = { bulkCreate };
