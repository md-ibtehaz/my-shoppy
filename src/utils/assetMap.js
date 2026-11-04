/**
 * Asset resolver for high-res cropped reference assets & remote fallback
 */

export const getProductImage = (product) => {
  if (!product) return null;
  if (product.localImage === 'prod-airpods-max.png') {
    return require('../../assets/prod-airpods-max.png');
  }
  if (product.localImage === 'prod-earbuds.png') {
    return require('../../assets/prod-earbuds.png');
  }
  if (product.localImage === 'prod-bose.png') {
    return require('../../assets/prod-bose.png');
  }
  if (product.localImage === 'prod-vivefox.png') {
    return require('../../assets/prod-vivefox.png');
  }
  if (product.image) {
    return { uri: product.image };
  }
  return null;
};

export const getCategoryImage = (categoryName) => {
  if (!categoryName) return null;
  const name = String(categoryName).toLowerCase();
  if (name.includes('furniture')) {
    return require('../../assets/cat-furniture-hd.jpg');
  }
  if (name.includes('hand') || name.includes('bag')) {
    return require('../../assets/cat-handbag-hd.jpg');
  }
  if (name.includes('book')) {
    return require('../../assets/cat-books-hd.jpg');
  }
  if (name.includes('tech') || name.includes('electronic')) {
    return require('../../assets/cat-tech-hd.jpg');
  }
  if (name.includes('sneaker') || name.includes('shoe')) {
    return require('../../assets/cat-sneakers-hd.jpg');
  }
  if (name.includes('cloth') || name.includes('apparel') || name.includes('wear') || name.includes('travel')) {
    return require('../../assets/cat-cloth-hd.jpg');
  }
  return null;
};
