package com.klef.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.klef.model.Expense;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByUserId(Long userId);
}
