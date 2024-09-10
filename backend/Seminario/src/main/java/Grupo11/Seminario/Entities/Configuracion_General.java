package Grupo11.Seminario.Entities;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "configuracion_general")
@Data
@NoArgsConstructor
public class Configuracion_General {
    
    // Se define el ID como autoincremental
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, name = "monto_reserva")
    private Float monto_reserva;

    @Column(nullable = false, name = "porcentaje_senia")
    private Float porcentaje_seña;

    @Column(nullable = false, name = "descuento_socio")
    private Float descuento_socio;

    @Column(nullable = false, name = "monto_paletas")
    private Float monto_paletas;

    @Column(nullable = false, name = "monto_pelotas")
    private Float monto_pelotas;

    @Column(nullable = false, name = "duracion_maxima_turno")
    private Integer duracion_maxima_turno;

    @Column(nullable = false, name = "horario_inicio_pico")
    private LocalTime horario_inicio_pico;

    @Column(nullable = false, name = "horario_fin_pico")
    private LocalTime horario_fin_pico;

    @OneToMany
    @JoinColumn(nullable = false, name = "dia_apertura_id")
    private List<Dia_Apertura> dias_apertura = new ArrayList<>();

}
