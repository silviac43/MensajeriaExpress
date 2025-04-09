package entornos.taller.controller;

import entornos.taller.model.EmpresaMensajeria;
import entornos.taller.service.EmpresaMensajeriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/empresas")
public class EmpresaMensajeriaController {

    @Autowired
    private EmpresaMensajeriaService empresaService;

    @GetMapping
    public List<EmpresaMensajeria> listarEmpresas() {
        return empresaService.listarTodas();
    }

    @GetMapping("/{id}")
    public EmpresaMensajeria obtenerEmpresa(@PathVariable Long id) {
        return empresaService.buscarPorId(id);
    }

    @PostMapping
    public EmpresaMensajeria crearEmpresa(@RequestBody EmpresaMensajeria empresa) {
        return empresaService.guardar(empresa);
    }

    @PutMapping("/{id}")
    public EmpresaMensajeria actualizarEmpresa(@PathVariable Long id, @RequestBody EmpresaMensajeria empresa) {
        return empresaService.actualizar(id, empresa);
    }

    @DeleteMapping("/{id}")
    public void eliminarEmpresa(@PathVariable Long id) {
        empresaService.eliminar(id);
    }
}
