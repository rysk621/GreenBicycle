package edu.pnu.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.pnu.domain.Board;
import java.util.List;


public interface BoardRepository extends JpaRepository<Board, Long> {
	List<Board> findByWriter(String writer);
	List<Board> findByTitleContains(String title);
	List<Board> findByWriterContains(String writer);
}
