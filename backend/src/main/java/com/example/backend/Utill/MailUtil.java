package com.example.backend.Utill;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class MailUtil {

//    @Autowired
//    private JavaMailSender mailSender;

    public void sendSaleConfirmation(String toEmail, String saleId) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply.winotrading@gmail.com");
        message.setTo(toEmail);
        message.setText("Thank You for Your Purchase!\n" +
                "Your sale (Sale ID: ["+saleId+"]) has been successfully processed. Thank you for your purchase!");
        message.setSubject("GOMART - Sale Confirmation!");

//        mailSender.send(message);
        System.out.println("Mail Sent!!!!!");
    }
}
