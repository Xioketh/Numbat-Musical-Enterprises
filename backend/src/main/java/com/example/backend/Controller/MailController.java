package com.example.backend.Controller;

import com.example.backend.DTO.MailDto;
import com.example.backend.Utill.MailUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class MailController {

    @Autowired
    MailUtil mailUtil;

    @PostMapping({"/sendmail"})
    public MailDto receiveString(@RequestBody MailDto data) {
        String sendMail = data.getSendMail();
        String saleId=data.getSaleId();

//        mailUtil.sendSaleConfirmation(sendMail,saleId);
        return data;
    }
}
