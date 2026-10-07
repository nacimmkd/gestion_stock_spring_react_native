package com.nacimmkd.gestion_stock_api.dtos;

import com.nacimmkd.gestion_stock_api.models.Category;

import java.util.List;
import java.util.UUID;

public record CategoryDto(
        UUID id,
        String name
) {

    public static CategoryDto of(Category c) {
        return new CategoryDto(
                c.getId(),
                c.getName()
        );
    }

    public static List<CategoryDto> of(List<Category> categories) {
        return categories.stream()
                .map(CategoryDto::of)
                .toList();
    }
}
