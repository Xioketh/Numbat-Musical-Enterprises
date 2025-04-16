package com.example.backend.Repository;

import com.example.backend.Model.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface ProductRepository extends JpaRepository<Products, Long> {

    Optional<Products> findById(Long id);

//    Products save(Products products);

    @Query(value = "SELECT MAX(id) AS latest_id FROM products;", nativeQuery = true)
    String lastID();

    @Query(value = "SELECT * FROM products WHERE status=1;", nativeQuery = true)
    List<Products> getAllPRoducts();

    @Query(value = "SELECT * FROM products WHERE status=1 ORDER BY id DESC LIMIT 5;", nativeQuery = true)
    List<Products> getLatestProducts();

    @Query(value = "SELECT * FROM products WHERE product_id=?1", nativeQuery = true)
    List<Products> getProductById(String productId);

    @Query(value = "SELECT * FROM products WHERE product_id=?1", nativeQuery = true)
    Optional<Products> getProductByIdOptional(String productId);

    @Query(value = "SELECT * FROM products;", nativeQuery = true)
    List<Products> getActiveAndNonActivePoducts();

    @Query(value = "SELECT * FROM products WHERE qty <> 0 AND status=1;", nativeQuery = true)
    List<Products> getActiveProducts();

    @Modifying
    @Query(value = "UPDATE  products SET category = ?1, create_date=?2, price = ?3, qty=?5, description=?6, product_name=?7, status=?8 WHERE product_id = ?4", nativeQuery = true)
    int productUpdate(String category, String createDate, int price, String productId, int qty, String description,String productName,int status);

    @Modifying
    @Query(value = "UPDATE  products SET qty =?1 WHERE product_id = ?2", nativeQuery = true)
    int updateQty(int qty, String productId);

    @Modifying
    @Query(value = "UPDATE  products SET status = 0 WHERE product_id = ?1", nativeQuery = true)
    int deleteProduct(String productId);


}
