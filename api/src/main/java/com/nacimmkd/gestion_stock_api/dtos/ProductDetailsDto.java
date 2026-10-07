package com.nacimmkd.gestion_stock_api.dtos;

import com.nacimmkd.gestion_stock_api.models.Product;
import com.nacimmkd.gestion_stock_api.models.StockStatus;

import java.time.Instant;
import java.util.UUID;

public record ProductDetailsDto(
        UUID id,
        String name,
        String reference,
        String description,
        CategoryDto category,
        int quantity,
        int alertThreshold,
        StockStatus status,
        Instant updatedAt
) {
    public static ProductDetailsDto of(Product p) {
        return new ProductDetailsDto(
                p.getId(),
                p.getName(),
                p.getReference(),
                p.getDescription(),
                CategoryDto.of(p.getCategory()),
                p.getQuantity(),
                p.getAlertThreshold(),
                p.getStatus(),
                p.getUpdatedAt());
    }
}
