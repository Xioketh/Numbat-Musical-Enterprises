package com.example.backend.Service;


import com.cloudinary.Cloudinary;
import com.example.backend.DTO.ImageDto;
import com.example.backend.Model.Products;
import com.example.backend.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.*;

@Service
public class CloudinaryService {
    Cloudinary cloudinary;

    @Autowired
    ProductRepository productRepository;

    public CloudinaryService() {
        Map<String, String> valuesMap = new HashMap<>();
        valuesMap.put("cloud_name", "ddqccvm2x");
        valuesMap.put("api_key", "998798199659193");
        valuesMap.put("api_secret", "wKTvdx_RIshQOYv5a_fKLv-3uiU");
        cloudinary = new Cloudinary(valuesMap);
    }

    @Transactional
    public ResponseEntity<?> upload(ImageDto imageDto) throws IOException {
//        String productId=imageDto.getpId();
        Products products=new Products();
        String image1 = null;
        String image2 = null;
        String image3 = null;

        String currentId = productRepository.lastID();
        String nextID="";

        if (currentId !=null){
            int nextNumericValue = Integer.parseInt(currentId) + 1;
            nextID = String.format("P%04d", nextNumericValue);
        }else{
            nextID = String.format("P%04d", 1);
        }

        try {
            if (imageDto.getImage1() != null){
                File file = convert(imageDto.getImage1());
                Map result = cloudinary.uploader().upload(file, Collections.emptyMap());
                image1=(String) result.get("url");
                System.out.println("img1:" + image1);
            }
            if (imageDto.getImage2() != null){
                File file = convert(imageDto.getImage2());
                Map result = cloudinary.uploader().upload(file, Collections.emptyMap());
                image2=(String) result.get("url");
                System.out.println("img2:" + image2);
            }
            if (imageDto.getImage3() != null){
                File file = convert(imageDto.getImage1());
                Map result = cloudinary.uploader().upload(file, Collections.emptyMap());
                image3=(String) result.get("url");
                System.out.println("img3:" + image3);
            }

            products.setProductID(nextID);
            products.setImage1(image1);
            products.setImage2(image2);
            products.setImage3(image3);
            products= productRepository.save(products);

            return new ResponseEntity<>(products, HttpStatus.CREATED);
        } catch (MaxUploadSizeExceededException e) {
            String errorMessage = "Maximum upload size exceeded please try with Different Image";
            return new ResponseEntity<>(errorMessage, HttpStatus.PAYLOAD_TOO_LARGE);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred during image upload.", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    private File convert(MultipartFile multipartFile) throws IOException {
        File file = new File(Objects.requireNonNull(multipartFile.getOriginalFilename()));
        FileOutputStream fo = new FileOutputStream(file);
        fo.write(multipartFile.getBytes());
        fo.close();
        return file;
    }
}

