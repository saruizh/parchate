
package com.parchate.vaca_ms.vaca;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/parchate/vaca")
public class VacaController {
    @Autowired
    private VacaRepository vacaRepository;

    @PostMapping("/crear")
    public Vaca crearVaca(@RequestBody Vaca vaca) {
        return vacaRepository.save(vaca);
    }

    // Ver vacas de acuerdo a un id (GET)
    @GetMapping("/buscar/{id}")
    public ResponseEntity<Vaca> getVacaById(@PathVariable Long id) {
        Vaca vaca = vacaRepository.findById(id).orElse(null);
        if (vaca == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(vaca);
    }

    @PutMapping("/abonar")
    public ResponseEntity<String> abonarAVaca(@RequestBody Vaca vaca) {
        Long vacaId = vaca.getId();
        BigDecimal cantidad = vaca.getMontoTotal();

        if (vacaId == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("id de vaca no puede ser nulo");
        }
        
        Optional<Vaca> vacaOptional = vacaRepository.findById(vacaId);
        if (vacaOptional.isPresent()) {
            Vaca vacaExistente = vacaOptional.get();
            BigDecimal nuevoMontoTotal = vacaExistente.getMontoTotal().add(cantidad);
            vacaExistente.setMontoTotal(nuevoMontoTotal);
            vacaRepository.save(vacaExistente);
            return ResponseEntity.ok("Abono exitoso. Nuevo monto total: " + nuevoMontoTotal);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vaca no encontrada");
        }
        
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarVaca(@PathVariable Long id) {
        Vaca vaca = vacaRepository.findById(id).orElse(null);
        if (vaca == null) {
            return ResponseEntity.notFound().build();
        }
        vacaRepository.delete(vaca);
        return ResponseEntity.ok().build();
    
    }
}