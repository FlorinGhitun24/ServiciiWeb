package servicii.web.restapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import servicii.web.restapi.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
}
