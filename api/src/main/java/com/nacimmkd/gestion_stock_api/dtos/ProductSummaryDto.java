package com.nacimmkd.gestion_stock_api.dtos;

import com.nacimmkd.gestion_stock_api.models.Product;
import com.nacimmkd.gestion_stock_api.models.StockStatus;

import java.util.List;
import java.util.UUID;

public record ProductSummaryDto(
      UUID id,
      String name,
      CategoryDto Category,
      int quantity,
      int alertThreshold,
      StockStatus status
) {

    public static ProductSummaryDto of(Product p) {
        return new ProductSummaryDto(
                p.getId(),
                p.getName(),
                CategoryDto.of(p.getCategory()),
                p.getQuantity(),
                p.getAlertThreshold(),
                p.getStatus()
        );
    }

    public static List<ProductSummaryDto> of(List<Product> products) {
        return products.stream()
                .map(ProductSummaryDto::of)
                .toList();
    }
}
