package com.example.backend.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.web.multipart.MultipartFile;


public class ImageDto {

    private String pId;

    @JsonIgnore
    private MultipartFile image1;

    @JsonIgnore
    private MultipartFile image2;

    @JsonIgnore
    private MultipartFile image3;

    public ImageDto(MultipartFile image1, MultipartFile image2, MultipartFile image3) {
//        this.pId=pId;
        this.image1 = image1;
        this.image2 = image2;
        this.image3 = image3;
    }

    public String getpId() {
        return pId;
    }

    public void setpId(String pId) {
        this.pId = pId;
    }

    public MultipartFile getImage1() {
        return image1;
    }

    public void setImage1(MultipartFile image1) {
        this.image1 = image1;
    }

    public MultipartFile getImage2() {
        return image2;
    }

    public void setImage2(MultipartFile image2) {
        this.image2 = image2;
    }

    public MultipartFile getImage3() {
        return image3;
    }

    public void setImage3(MultipartFile image3) {
        this.image3 = image3;
    }
}
