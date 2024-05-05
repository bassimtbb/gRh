package com.saiph.application.GestionRH.rest;

import com.saiph.application.GestionRH.services.UserDetailImpService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/userD")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Tag(name = "UserDetailImp")
public class UserDetailImpController {

    private final UserDetailImpService userDetailImpService;

    @Autowired
    public UserDetailImpController(UserDetailImpService userDetailImpService) {
        this.userDetailImpService = userDetailImpService;
    }

    @GetMapping("/username/{username}")
    public UserDetails loadUserByUsername(@PathVariable String username) throws UsernameNotFoundException {
        return userDetailImpService.loadUserByUsername(username);
    }
}
