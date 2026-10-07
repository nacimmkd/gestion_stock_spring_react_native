package com.nacimmkd.gestion_stock_api.dtos;

import com.nacimmkd.gestion_stock_api.models.CategoryCount;

import java.util.List;

public record CategoryCountDto(
        String category,
        int count
) {

    public static CategoryCountDto of(CategoryCount projection) {
        return new CategoryCountDto(projection.getCategory(), projection.getCount());
    }

    public static List<CategoryCountDto> of(List<CategoryCount> projections) {
        return projections.stream()
                .map(CategoryCountDto::of)
                .toList();
    }
}
