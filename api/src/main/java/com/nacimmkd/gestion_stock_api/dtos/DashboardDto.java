package com.nacimmkd.gestion_stock_api.dtos;

import com.nacimmkd.gestion_stock_api.models.CategoryCount;
import com.nacimmkd.gestion_stock_api.models.StockStats;

import java.util.List;

public record DashboardDto(
        long totalProducts,
        long totalQuantity,
        long outOfStock,
        long lowStock,
        List<CategoryCountDto> productsByCategory
) {

    public static DashboardDto of(StockStats stockStats, List<CategoryCount> categoryCounts) {
        return new DashboardDto(
                stockStats.getTotalProducts(),
                stockStats.getTotalQuantity(),
                stockStats.getOutOfStock(),
                stockStats.getLowStock(),
                CategoryCountDto.of(categoryCounts)
        );
    }
}