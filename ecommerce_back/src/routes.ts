interface IPaths {
  url?: string;
  router: string;
}

export const RESTPATHS: IPaths[] = [
  { url: "users", router: "users" },
  { url: "categories", router: "categories" },
  { url: "products", router: "products" },
  { url: "orders", router: "orders" },
];
