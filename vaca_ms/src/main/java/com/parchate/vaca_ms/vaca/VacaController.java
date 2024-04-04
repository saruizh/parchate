
package com.parchate.vaca_ms.vaca;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.List;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;



@RestController
@RequestMapping("/parchate/vaca")
public class VacaController {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public class RabbitConfig {

        public static final String ABONAR = "cola_abonar";

        @Bean
        public Queue abonarQueue() {
            return new Queue(ABONAR, false);
        }
    }

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

            // Enviar mensaje a RabbitMQ
            rabbitTemplate.convertAndSend(RabbitConfig.ABONAR, "Abono exitoso. Nuevo monto total: " + nuevoMontoTotal);
            
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