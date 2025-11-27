package com.klef.service;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.klef.repository.ExpenseRepository;
import com.klef.model.Expense;
import java.util.List;

@Service
public class ExpenseService {
    @Autowired private ExpenseRepository repo;

    public Expense save(Expense e) { return repo.save(e); }
    public List<Expense> findByUserId(Long userId) { return repo.findByUserId(userId); }
    public void deleteById(Long id) { repo.deleteById(id); }
}
