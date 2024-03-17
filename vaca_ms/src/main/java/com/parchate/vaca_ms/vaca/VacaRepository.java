package com.parchate.vaca_ms.vaca;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VacaRepository extends JpaRepository<Vaca, Long> {
    Vaca getVacaById(long id);    
}

