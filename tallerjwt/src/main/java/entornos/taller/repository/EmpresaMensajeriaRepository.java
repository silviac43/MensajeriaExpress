package entornos.taller.repository;

import entornos.taller.model.EmpresaMensajeria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpresaMensajeriaRepository extends JpaRepository<EmpresaMensajeria, Long> {
}
