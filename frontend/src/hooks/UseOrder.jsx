import React, { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';



const mockOrder = {
  user_id: "68cf35355d0307a943206502",
  commerce_id: "68cf3f02a82f68b4e636457e",
  products: [
    {
      _id: "68cf5855dd378731e5b7dd77",
      sku: "PAN001",
      name: "Pan Francés",
      description: "Clásico pan francés crocante por fuera y suave por dentro",
      image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6bBe43jKiqH2qGB…",
      price: 250,
      quantity: 2,
      clarification: "",
      discount: 40,
      advance_in_days: 2,
      measure: "unit",
      shop: "68cf3f02a82f68b4e636457e"
    },
    {
      _id: "68cf597ea88c72c0acceefeb",
      sku: "FACT001",
      name: "Factura de Dulce de Leche",
      description: "Deliciosa factura rellena de dulce de leche artesanal",
      image_url: "https://cdn0.recetasgratis.net/es/posts/2/2/9/facturas_de_dulce_de_lec…",
      price: 150,
      quantity: 3,
      clarification: "",
      discount: 0,
      advance_in_days: 0,
      measure: "unit",
      shop: "68cf3f02a82f68b4e636457e"
    },
    {
      _id: "68cf598ba88c72c0acceefee",
      sku: "MED001",
      name: "Medialuna",
      description: "Medialuna de manteca fresca, ideal para acompañar con café",
      image_url: "https://resizer.glanacion.com/resizer/v2/medialunas-faciles-de-M2NJ4M5…",
      price: 120,
      quantity: 5,
      clarification: "",
      discount: 0,
      advance_in_days: 0,
      measure: "unit",
      shop: "68cf3f02a82f68b4e636457e"
    }
  ]
};


