package com.nacimmkd.gestion_stock_api.controllers;

import com.nacimmkd.gestion_stock_api.dtos.CategoryDto;
import com.nacimmkd.gestion_stock_api.repositories.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryRepository categoryRepository;

    @GetMapping
    public ResponseEntity<List<CategoryDto>> getAllCategories() {
        var categories = this.categoryRepository.findAll();
        return ResponseEntity.ok(CategoryDto.of(categories));
    }
}
