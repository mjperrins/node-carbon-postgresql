import timer from '../util/timer';

export class StockItemMockService {
  async listStockItems() {
    // wait 1 second before returning data
    await timer(1000);

    return [
      {
        "sku_id": 12020,
        "name": "Kettle",
        "stock": "23",
        "description": "Electric Kettle",
        "unit_price": "24.99",
        "manufacturer": "Ikea",
        "picture_url": "https://www.ikea.com/ca/en/images/products/vattentaet-kettle-stainless-steel-black__0713344_PE729450_S5.JPG?f=sg"
      },
      {
        "sku_id": 23350,
        "name": "Toaster",
        "stock": "56",
        "description": "Electric Toaster",
        "unit_price": "49.99",
        "manufacturer": "Amazon",
        "picture_url": "https://images-na.ssl-images-amazon.com/images/I/61bHAS2dovL._AC_SX522_.jpg"
      }
    ];
  }
}
