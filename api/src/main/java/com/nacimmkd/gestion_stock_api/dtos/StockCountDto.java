package com.nacimmkd.gestion_stock_api.dtos;

import com.nacimmkd.gestion_stock_api.models.StockStats;
import com.nacimmkd.gestion_stock_api.models.StockStatus;

import java.util.List;

public record StockCountDto(
        StockStatus status,
        long count
) {

    public static List<StockCountDto> of(StockStats stats) {
        return List.of(
                new StockCountDto(StockStatus.NORMAL, stats.getNormalStock()),
                new StockCountDto(StockStatus.FAIBLE, stats.getLowStock()),
                new StockCountDto(StockStatus.RUPTURE, stats.getOutOfStock())
        );
    }
}
