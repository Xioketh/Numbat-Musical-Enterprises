package com.example.backend.DTO;


import com.example.backend.Model.SaleItems;
import org.springframework.data.annotation.Id;

import java.util.List;

public class ProductsDto {

    @Id
    private Long id;
    private String productID;
    private String category;
    private int price;
    private int qty;
    private int initialQty;
    private int itemizedTotalAmount;
    private String createDate;
    private String image1;
    private String image2;
    private String image3;
    private String description;
    private String productName;
    private List<SaleItems> saleItems;
    private List<SaleItemsDto> saleItemsDtos;

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

    public List<SaleItemsDto> getSaleItemsDtos() {
        return saleItemsDtos;
    }

    public void setSaleItemsDtos(List<SaleItemsDto> saleItemsDtos) {
        this.saleItemsDtos = saleItemsDtos;
    }

    public String getCategory() {
        return category;
    }

    public List<SaleItems> getSaleItems() {
        return saleItems;
    }

    public void setSaleItems(List<SaleItems> saleItems) {
        this.saleItems = saleItems;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
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

    public int getInitialQty() {
        return initialQty;
    }

    public void setInitialQty(int initialQty) {
        this.initialQty = initialQty;
    }

    public int getItemizedTotalAmount() {
        return itemizedTotalAmount;
    }

    public void setItemizedTotalAmount(int itemizedTotalAmount) {
        this.itemizedTotalAmount = itemizedTotalAmount;
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
