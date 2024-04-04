package edu.pnu.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import edu.pnu.domain.RoadInfo;
import edu.pnu.persistence.RoadInfoRepository;

@Service
public class RoadInfoService {
	@Autowired
	private RoadInfoRepository roadInfoRepo;

	public List<RoadInfo> getRoadInfo() {
		return roadInfoRepo.findAll();
	}

	public Integer getLev(Integer id) {
		if(!roadInfoRepo.existsById(id)) return 0;
		return roadInfoRepo.findById(id).get().getLev();
	}
	
	public ResponseEntity<?> getDetail(Integer seq) {
		return ResponseEntity.ok().body(roadInfoRepo.findBySeq(seq).get(0));
	}
}
