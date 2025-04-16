package com.example.backend.Model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "products")
public class Products {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "productId")
    private String productID;

    @Column(name = "productName")
    private String productName;

    @Column(name = "category")
    private String category;

    @Column(name = "price")
    private int price;

    @Column(name = "qty")
    private int qty;

    @Column(name = "createDate")
    private String createDate;

    @Column(name = "image1")
    private String image1;

    @Column(name = "image2")
    private String image2;

    @Column(name = "image3")
    private String image3;

    @Column(name = "description")
    private String description;

    @Column(name = "status")
    private int status;


    public Products(){

    }

    public Products(int status, String productID, String productName, String category, int price, int qty, String createDate, String image1, String image2, String image3, String description) {
        this.productID = productID;
        this.productName = productName;
        this.category = category;
        this.price = price;
        this.qty = qty;
        this.createDate = createDate;
        this.image1 = image1;
        this.image2 = image2;
        this.image3 = image3;
        this.description = description;
        this.status = status;
    }


    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getProductID() {
        return productID;
    }

    public void setProductID(String productID) {
        this.productID = productID;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getQty() {
        return qty;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public String getImage1() {
        return image1;
    }

    public void setImage1(String image1) {
        this.image1 = image1;
    }

    public String getImage2() {
        return image2;
    }

    public void setImage2(String image2) {
        this.image2 = image2;
    }

    public String getImage3() {
        return image3;
    }

    public void setImage3(String image3) {
        this.image3 = image3;
    }
}
