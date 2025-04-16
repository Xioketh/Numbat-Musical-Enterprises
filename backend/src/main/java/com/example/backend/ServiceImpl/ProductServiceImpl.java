package com.example.backend.ServiceImpl;


import com.example.backend.DTO.ProductsDto;
import com.example.backend.Model.Products;
import com.example.backend.Repository.ProductRepository;
import com.example.backend.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;


@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductRepository productRepository;


    @Transactional
    public ResponseEntity<?> save(ProductsDto productsDto) {

        try {

            LocalDateTime currentTime = LocalDateTime.now();
            String createDate = currentTime.toString();
            int x = productRepository.productUpdate(productsDto.getCategory(), createDate, productsDto.getPrice(),productsDto.getProductID(),productsDto.getQty(),productsDto.getDescription(), productsDto.getProductName(),1);

            return new ResponseEntity<>(productsDto, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public Products productsDtoTOEntity(ProductsDto productsDto){
        Products products = new Products();
        products.setProductID(productsDto.getProductID());
        products.setCategory(productsDto.getCategory());
        products.setPrice(productsDto.getPrice());
        products.setQty(productsDto.getQty());
        products.setImage1(productsDto.getImage1());
        products.setImage2(productsDto.getImage2());
        products.setImage3(productsDto.getImage3());
        products.setProductName(productsDto.getProductName());
        products.setDescription(productsDto.getDescription());

        return products;
    }




    @Override
    public ResponseEntity<?> getAllProducts() {
        List<Products> products=productRepository.getAllPRoducts();
        return ResponseEntity.ok(products);
    }

    public ResponseEntity<?> getLatestProducts() {
        List<Products> products=productRepository.getLatestProducts();
        return ResponseEntity.ok(products);
    }

    public ResponseEntity<?> getActiveProducts() {
        List<Products> products=productRepository.getActiveProducts();
        return ResponseEntity.ok(products);
    }

    @Transactional
    public String deleteProduct(ProductsDto productsDto) {
        try {
            int x=productRepository.deleteProduct(productsDto.getProductID());
            return "Success!";
        }catch (Exception e){
            return "Not Sucess";
        }

    }

}
