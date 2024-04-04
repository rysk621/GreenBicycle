package edu.pnu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.pnu.domain.Member;
import edu.pnu.service.MemberService;

@RestController
public class MemberController {

	@Autowired
	private MemberService memberService;

	@GetMapping("/admin/member")
	public ResponseEntity<?> getMember(String id){
		return ResponseEntity.ok(memberService.getMember(id));
	}

	@GetMapping("/admin/memberlist")
	public ResponseEntity<?> getmembers(){
		return ResponseEntity.ok(memberService.getMembers());
	}

	@PostMapping("/idCheck")
	public ResponseEntity<?> idCheck(@RequestBody Member member){
		return ResponseEntity.ok(memberService.idCheck(member.getId()));
	}

	@PostMapping("/join")
	public ResponseEntity<?> addMember(@RequestBody Member member) {
		return ResponseEntity.ok(memberService.addMember(member));
	}

	@PutMapping("/member")
	public ResponseEntity<?> updateMember(@RequestBody Member member) {
		return ResponseEntity.ok(memberService.updateMember(member));
	}

	@PutMapping("/member1")
	public ResponseEntity<?> updateMember1(@AuthenticationPrincipal UserDetails user,
			@RequestParam(required=false) String username,
			@RequestParam(required=false) String password,
			@RequestParam(required=false) int birthdate) {
		return ResponseEntity.ok(memberService.updateMember1(user, username, password, birthdate));
	}

	@DeleteMapping("/admin/{id}")
	public ResponseEntity<?> deleteMemberByAdmin(@PathVariable String id) {
		return ResponseEntity.ok(memberService.deleteMember(id));
	}

	@DeleteMapping("/admin")
	public ResponseEntity<?> deleteMemberByAdmin1(@RequestParam String id){
		return ResponseEntity.ok(memberService.deleteMember(id));
	}

//	@DeleteMapping("/member")
//	public ResponseEntity<?> deleteMember(@AuthenticationPrincipal UserDetails user){
//		return ResponseEntity.ok(memberService.deleteMember(user));
//	}
}
