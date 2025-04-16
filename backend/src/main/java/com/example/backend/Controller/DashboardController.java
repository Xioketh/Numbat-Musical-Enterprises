package com.example.backend.Controller;

import com.example.backend.Service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class DashboardController {

    @Autowired
    DashboardService dashboardService;


    @PostMapping(value = "/getCount")
    public ResponseEntity<?> getCount() {
        return dashboardService.getCount();
    }

}
