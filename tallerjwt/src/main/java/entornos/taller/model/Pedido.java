package entornos.taller.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Table(name = "pedido")
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    @NotNull(message = "El cliente es obligatorio")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "empresa_id", nullable = false)
    @NotNull(message = "La empresa es obligatoria")
    private EmpresaMensajeria empresa;

    @NotBlank(message = "La dirección de recogida es obligatoria")
    @Size(max = 255, message = "La dirección no puede superar los 255 caracteres")
    private String direccion_recogida;

    @NotBlank(message = "La dirección de entrega es obligatoria")
    @Size(max = 255, message = "La dirección no puede superar los 255 caracteres")
    private String direccion_entrega;

    @NotBlank(message = "El tipo de paquete es obligatorio")
    @Size(max = 100, message = "El tipo de paquete no puede superar los 100 caracteres")
    private String tipo_paquete;

    @Enumerated(EnumType.STRING)
    private EstadoPedido estado = EstadoPedido.PENDIENTE;

    private LocalDateTime fecha_creacion = LocalDateTime.now();

    @Size(max = 500, message = "Las notas no pueden superar los 500 caracteres")
    private String notas;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Cliente getCliente() { return cliente; }
    public void setCliente(Cliente cliente) { this.cliente = cliente; }

    public EmpresaMensajeria getEmpresa() { return empresa; }
    public void setEmpresa(EmpresaMensajeria empresa) { this.empresa = empresa; }

    public String getDireccionRecogida() { return direccion_recogida; }
    public void setDireccionRecogida(String direccion_recogida) { this.direccion_recogida = direccion_recogida; }

    public String getDireccionEntrega() { return direccion_entrega; }
    public void setDireccionEntrega(String direccion_entrega) { this.direccion_entrega = direccion_entrega; }

    public String getTipoPaquete() { return tipo_paquete; }
    public void setTipoPaquete(String tipo_paquete) { this.tipo_paquete = tipo_paquete; }

    public EstadoPedido getEstado() { return estado; }
    public void setEstado(EstadoPedido estado) { this.estado = estado; }

    public LocalDateTime getFechaCreacion() { return fecha_creacion; }
    public void setFechaCreacion(LocalDateTime fecha_creacion) { this.fecha_creacion = fecha_creacion; }

    public String getNotas() { return notas; }
    public void setNotas(String notas) { this.notas = notas; }

    public enum EstadoPedido {
        PENDIENTE, ASIGNADO, EN_TRANSITO, ENTREGADO
    }
}
