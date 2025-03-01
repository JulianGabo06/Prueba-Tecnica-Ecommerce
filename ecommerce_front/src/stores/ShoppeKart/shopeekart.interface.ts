export interface State {
  Product: any;
}

export interface Action {
  addProductKart: (product: State["Product"], count: number) => void;
  removeProductKart: (id: number) => void;
  // SaveDataProduct: (product: State["product"]) => void;
  clearCart: () => void;
  // clearSelections: () => void;
  // setCreateDataOrder: (dataOrder: State["DataCreateOrder"]) => void;
}
