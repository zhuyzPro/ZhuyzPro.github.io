function toArray(collection) {
  return collection && typeof collection.toArray === "function"
    ? collection.toArray()
    : [];
}

function sortByPriorityAndDate(items) {
  return items.sort((left, right) => {
    const priority = Number(right.priority || 0) - Number(left.priority || 0);
    if (priority !== 0) return priority;
    return (
      new Date(right.updated || right.date || 0) -
      new Date(left.updated || left.date || 0)
    );
  });
}

function findById(list, id) {
  return (list || []).find((item) => item.id === id);
}

hexo.extend.helper.register("published_products", function publishedProducts() {
  return sortByPriorityAndDate(
    toArray(this.site.pages).filter(
      (page) => page.layout === "product" && page.published !== false,
    ),
  );
});

hexo.extend.helper.register("published_posts", function publishedPosts() {
  return sortByPriorityAndDate(
    toArray(this.site.posts).filter((post) => post.published !== false),
  );
});

hexo.extend.helper.register("find_aroma", function findAroma(id) {
  return findById(this.site.data.aromas, id);
});

hexo.extend.helper.register("find_origin", function findOrigin(id) {
  return findById(this.site.data.origins, id);
});

hexo.extend.helper.register("find_site", function findSite(id) {
  return findById(this.site.data.sites, id);
});

hexo.extend.helper.register(
  "find_plant_material",
  function findPlantMaterial(id) {
    return findById(this.site.data.plant_materials, id);
  },
);

hexo.extend.helper.register("find_reference", function findReference(id) {
  return findById(this.site.data.references, id);
});

hexo.extend.helper.register(
  "resolve_references",
  function resolveReferences(ids) {
    return (ids || [])
      .map((id) => findById(this.site.data.references, id))
      .filter(Boolean);
  },
);

hexo.extend.helper.register(
  "consultation_topics",
  function consultationTopics() {
    const contact = this.site.data.contact || {};
    const base = (contact.consultation_types || []).map((item) => item.id);
    const products = toArray(this.site.pages).filter(
      (page) => page.layout === "product" && page.published !== false,
    );
    const productTopics = products.flatMap((page) => [
      `product-${page.product_id}`,
      `brewing-${page.product_id}`,
    ]);
    const aromaTopics = (this.site.data.aromas || [])
      .filter((item) => item.status === "published")
      .map((item) => `aroma-${item.id}`);

    return [...new Set([...base, ...productTopics, ...aromaTopics])].sort();
  },
);
