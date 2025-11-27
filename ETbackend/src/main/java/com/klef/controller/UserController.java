package com.klef.controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.klef.service.UserService;
import com.klef.model.User;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class UserController {
    @Autowired private UserService userService;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        // Add basic validation if needed
        return userService.register(user);
    }

    @PostMapping("/login")
    public Object login(@RequestBody Map<String,String> body) {
        String email = body.get("email");
        String password = body.get("password");
        Optional<User> u = userService.login(email, password);
        if (u.isPresent()) {
            // Return user info (no password)
            User safe = new User();
            safe.setId(u.get().getId());
            safe.setEmail(u.get().getEmail());
            safe.setUsername(u.get().getUsername());
            return safe;
        } else {
            return Map.of("error","Invalid credentials");
        }
    }

    @GetMapping("/users/{id}")
    public Object getUser(@PathVariable Long id) {
        return userService.findById(id).orElse((User) Map.of("error","User not found"));
    }
}
