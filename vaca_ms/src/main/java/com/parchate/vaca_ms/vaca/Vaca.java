/*me falta poner paquete principal*/
package com.parchate.vaca_ms.vaca;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name="vaca")
public class Vaca{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
    @Column(name="id_plan")
	private Long idPlan;

    @Column(name="nombre_vaca")
	private String nombreVaca;

    @Column(name="fecha_limite")
	private LocalDateTime fechaLimite;

    @Column(name="monto_total")
	private BigDecimal montoTotal;

    @Column(name="alcance")
	private int Alcance;

	//Creo Getters and Setters de la clase Vaca
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdPlan() {
        return idPlan;
    }

    public void setIdPlan(Long idPlan) {
        this.idPlan = idPlan;
    }

    public String getNombreVaca() {
        return nombreVaca;
    }

    public void setNombreVaca(String nombreVaca) {
        this.nombreVaca = nombreVaca;
    }

    public LocalDateTime getFechaLimite() {
        return fechaLimite;
    }

    public void setFechaLimite(LocalDateTime fechaLimite) {
        this.fechaLimite = fechaLimite;
    }

    public BigDecimal getMontoTotal() {
        return montoTotal;
    }

    public void setMontoTotal(BigDecimal montoTotal) {
        this.montoTotal = montoTotal;
    }

    public int getAlcance() {
        return Alcance;
    }

    public void setAlcance(int alcance) {
        this.Alcance = alcance;
    }
	
}

