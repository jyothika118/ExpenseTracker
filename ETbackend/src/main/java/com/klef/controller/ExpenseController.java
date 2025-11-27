package com.klef.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.klef.service.ExpenseService;
import com.klef.service.UserService;
import com.klef.model.Expense;
import com.klef.model.User;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class ExpenseController {

    @Autowired 
    private ExpenseService expenseService;

    @Autowired 
    private UserService userService;

    @PostMapping("/expenses")
    public Object addExpense(@RequestBody Map<String, Object> body) {

        Long userId = Long.valueOf(String.valueOf(body.get("userId")));
        Optional<User> u = userService.findById(userId);

        if (u.isEmpty()) return Map.of("error","User not found");

        Expense e = new Expense();
        e.setTitle((String) body.get("title"));
        e.setAmount(Double.valueOf(String.valueOf(body.get("amount"))));
        e.setCategory((String) body.get("category"));
        e.setDate(java.time.LocalDate.parse((String) body.get("date")));
        e.setUser(u.get());

        return expenseService.save(e);
    }

    @GetMapping("/expenses/user/{userId}")
    public List<Expense> getUserExpenses(@PathVariable Long userId) {
        return expenseService.findByUserId(userId);
    }

    @DeleteMapping("/expenses/{id}")
    public void deleteExpense(@PathVariable Long id) {
        expenseService.deleteById(id);
    }

    // ⭐ NEW: Total Expenses API
    @GetMapping("/expenses/total/{userId}")
    public Map<String, Object> getTotalExpense(@PathVariable Long userId) {
        List<Expense> expenses = expenseService.findByUserId(userId);

        double total = expenses.stream()
            .mapToDouble(e -> e.getAmount())
            .sum();

        return Map.of("total", total);
    }
}
