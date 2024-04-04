package edu.pnu.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.pnu.domain.RoadInfo;

public interface RoadInfoRepository extends JpaRepository<RoadInfo, Integer> {
	List<RoadInfo> findByRoadnameContaining(String searchword);
	List<RoadInfo> findByLev(Integer lev);
	List<RoadInfo> findBySeq(Integer seq);
}
