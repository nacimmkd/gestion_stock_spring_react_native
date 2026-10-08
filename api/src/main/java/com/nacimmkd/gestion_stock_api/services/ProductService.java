package com.nacimmkd.gestion_stock_api.services;

import com.nacimmkd.gestion_stock_api.dtos.*;
import com.nacimmkd.gestion_stock_api.exceptions.CategoryNotFoundException;
import com.nacimmkd.gestion_stock_api.exceptions.ProductAlreadyExistsException;
import com.nacimmkd.gestion_stock_api.exceptions.ProductNotFoundException;
import com.nacimmkd.gestion_stock_api.models.Category;
import com.nacimmkd.gestion_stock_api.models.Product;
import com.nacimmkd.gestion_stock_api.models.StockMovementType;
import com.nacimmkd.gestion_stock_api.models.StockStatus;
import com.nacimmkd.gestion_stock_api.repositories.CategoryRepository;
import com.nacimmkd.gestion_stock_api.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;


    public Page<ProductSummaryDto> getAll(String search, UUID categoryId, StockStatus status, Pageable pageable) {
        var spec = ProductSpecs.nameOrCategoryContains(search)
                .and(ProductSpecs.hasCategory(categoryId))
                .and(ProductSpecs.hasStatus(status));

        return this.productRepository
                .findAll(spec, pageable)
                .map(ProductSummaryDto::of);
    }

    public ProductDetailsDto getById(UUID productId) {
        var product = getProductByIdOrThrow(productId);
        return ProductDetailsDto.of(product);
    }

    @Transactional
    public ProductDetailsDto create(ProductCreateRequest req) {

        if (this.productRepository.existsByReference(req.reference())) {
            throw new ProductAlreadyExistsException("Un produit avec cet référence existe déjà");
        }

        var category = getCategoryByIdOrThrow(req.categoryId());
        var product = Product.create(
                req.name(),
                req.reference(),
                req.description(),
                category,
                req.quantity(),
                req.alertThreshold()
        );
        return ProductDetailsDto.of(this.productRepository.save(product));
    }

    @Transactional
    public ProductDetailsDto update(UUID productId, ProductUpdateRequest req) {
        var product = getProductByIdOrThrow(productId);

        if (this.productRepository.existsByReferenceAndIdNot(req.reference(), product.getId())) {
            throw new ProductAlreadyExistsException("Référence déjà utilisée");
        }
        var category = getCategoryByIdOrThrow(req.categoryId());
        product.update(
                req.name(),
                req.reference(),
                req.description(),
                category,
                req.alertThreshold()
        );
        return ProductDetailsDto.of(this.productRepository.save(product));
    }

    @Transactional
    public ProductDetailsDto updateStock(UUID productId, StockUpdateRequest req) {
        var product = getProductByIdOrThrow(productId);
        if (req.type() == StockMovementType.ENTREE) {
            product.addStock(req.quantity());
        } else if (req.type() == StockMovementType.SORTIE) {
            product.removeStock(req.quantity());
        }
        return ProductDetailsDto.of(this.productRepository.saveAndFlush(product));
    }
    
    public void delete(UUID productId) {
        var product = getProductByIdOrThrow(productId);
        this.productRepository.delete(product);
    }


    private Product getProductByIdOrThrow(UUID productId) {
        return this.productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Produit introuvable"));
    }

    private Category getCategoryByIdOrThrow(UUID req) {
        return this.categoryRepository.findById(req)
                .orElseThrow(() -> new CategoryNotFoundException("Catégorie introuvable"));
    }

}
