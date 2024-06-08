package com.saiph.application.GestionRH.rest;

import com.saiph.application.GestionRH.Domain.dto.UserDto;
import com.saiph.application.GestionRH.Domain.entities.User;
import com.saiph.application.GestionRH.exception.ResourceNotFoundException;
import com.saiph.application.GestionRH.security.UserDetailService;
import com.saiph.application.GestionRH.services.GenericCrudService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/userD")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Tag(name = "User")
public class UserController  extends GenericCrudController<User, UserDto>{

    private final UserDetailService userService;

    @Autowired
    public UserController(UserDetailService userService) {
        this.userService = userService;
    }

    @GetMapping("/username/{username}")
    public UserDetails loadUserByUsername(@PathVariable String username) throws UsernameNotFoundException {
        return userService.loadUserByUsername(username);
    }

    @Override
    protected GenericCrudService<User, UserDto> getCrudService() {
        return userService;
    }
}
