package entornos.taller.service;

import entornos.taller.model.Pedido;
import entornos.taller.repository.PedidoRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    public List<Pedido> listarTodos() {
        return pedidoRepository.findAll();
    }

    public Pedido buscarPorId(Long id) {
        return pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado con ID: " + id));
    }

    public Pedido guardar(Pedido pedido) {
        return pedidoRepository.save(pedido);
    }

    public Pedido actualizar(Long id, Pedido pedidoActualizado) {
        Pedido pedido = buscarPorId(id);
        pedido.setDireccionRecogida(pedidoActualizado.getDireccionRecogida());
        pedido.setDireccionEntrega(pedidoActualizado.getDireccionEntrega());
        pedido.setTipoPaquete(pedidoActualizado.getTipoPaquete());
        pedido.setEstado(pedidoActualizado.getEstado());
        pedido.setNotas(pedidoActualizado.getNotas());
        return pedidoRepository.save(pedido);
    }

    public void eliminar(Long id) {
        pedidoRepository.deleteById(id);
    }
}
