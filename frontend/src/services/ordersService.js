import axios from "axios";
import baseURL from "./baseURL";

const ordersService = {
  createOrder: () => {
    console.warn("ordersService.createOrder() is disabled. Use OrderManager instead.");
    return Promise.resolve();
  }
};

export default ordersService;
