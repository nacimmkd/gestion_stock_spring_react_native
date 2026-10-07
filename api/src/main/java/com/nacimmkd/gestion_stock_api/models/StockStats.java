package com.nacimmkd.gestion_stock_api.models;

public interface StockStats {
    long getTotalProducts();
    long getTotalQuantity();
    long getOutOfStock();
    long getLowStock();
}