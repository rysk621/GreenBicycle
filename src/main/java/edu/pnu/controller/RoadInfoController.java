package edu.pnu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import edu.pnu.domain.RoadInfo;
import edu.pnu.service.RoadInfoService;

@RestController
public class RoadInfoController {

	@Autowired
	private RoadInfoService roadInfoService;

	@GetMapping("/roadinfo")
	public ResponseEntity<?> getRoadInfoList(RoadInfo roadInfo){
		return ResponseEntity.ok(roadInfoService.getRoadInfo());
	}

	@GetMapping("/roadinfo/{seq}")
	public ResponseEntity<?> getRoadInfoDetail(@PathVariable Integer seq){
		return ResponseEntity.ok(roadInfoService.getDetail(seq));
	}
}
