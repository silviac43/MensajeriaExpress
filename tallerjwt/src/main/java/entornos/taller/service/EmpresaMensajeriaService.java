package entornos.taller.service;

import entornos.taller.model.EmpresaMensajeria;
import entornos.taller.model.Usuario;
import entornos.taller.repository.EmpresaMensajeriaRepository;
import entornos.taller.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpresaMensajeriaService {

    @Autowired
    private EmpresaMensajeriaRepository empresaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<EmpresaMensajeria> listarTodas() {
        return empresaRepository.findAll();
    }

    public EmpresaMensajeria buscarPorId(Long id) {
        return empresaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empresa no encontrada con ID: " + id));
    }

    public EmpresaMensajeria guardar(EmpresaMensajeria empresa) {
        Usuario administrador = usuarioRepository.findById((long) empresa.getAdministrador().getId())
                .orElseThrow(() -> new RuntimeException("Administrador no encontrado con ID: " + empresa.getAdministrador().getId()));
        empresa.setAdministrador(administrador);
        return empresaRepository.save(empresa);
    }

    public EmpresaMensajeria actualizar(Long id, EmpresaMensajeria empresaActualizada) {
        EmpresaMensajeria empresa = buscarPorId(id);
        empresa.setNombre(empresaActualizada.getNombre());
        empresa.setAdministrador(empresaActualizada.getAdministrador());
        return empresaRepository.save(empresa);
    }

    public void eliminar(Long id) {
        empresaRepository.deleteById(id);
    }
}
