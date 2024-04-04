package edu.pnu.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import edu.pnu.domain.Board;
import edu.pnu.domain.Member;
import edu.pnu.dto.MemberDTO;
import edu.pnu.persistence.BoardRepository;
import edu.pnu.persistence.MemberRepository;

@Service
public class MemberService {

	@Autowired
	private MemberRepository memberRepo;

	@Autowired
	private BoardRepository boardRepo;

	@Autowired
	private PasswordEncoder encoder;

	public List<Member> getMembers() {
		return memberRepo.findAll();
	}

	public ResponseEntity<?> idCheck(String id){
		System.out.println("idCheck method");
//		try {
			if (memberRepo.existsById(id)) {
				System.out.println("이미 사용중인 ID입니다.");
				return ResponseEntity.badRequest().body("이미 사용중인 ID입니다.");
			}
			System.out.println("사용가능한 ID입니다.");
			return ResponseEntity.ok().body("사용가능한 ID입니다.");
//		} catch (Exception e) {
//			System.out.println("Exception: " + e.getMessage());
//			return ResponseEntity.badRequest().body("Exception: " + e.getMessage());
//		}
	}

	public ResponseEntity<?> getMember(String id) {
		try {
			if (!memberRepo.existsById(id)) {
				System.out.println("no such member");
				return ResponseEntity.badRequest().body("no such member");
			}
			Member member = memberRepo.findById(id).get();
			MemberDTO memberdto = new MemberDTO(member.getId(), member.getUsername(), member.getRole(), member.getBirthDate());
			return ResponseEntity.ok(memberdto);
		} catch (Exception e) {
			System.out.println("Exception: " + e.getMessage());
			return ResponseEntity.badRequest().body("Exception: " + e.getMessage());
		}
	}

	public ResponseEntity<?> addMember(Member member) {
		try {
			if (memberRepo.existsById(member.getId())) {
				System.out.println("중복 id");
				return ResponseEntity.badRequest().body("중복된 아이디입니다.");
			} else if (!memberRepo.findByUsername(member.getUsername()).isEmpty()){
				System.out.println("중복 username");
				return ResponseEntity.badRequest().body("중복된 username입니다.");
			} else {
				Member memberNew = Member.builder()
						.id(member.getId())
						.username(member.getUsername())
						.password(encoder.encode(member.getPassword()))
						.birthDate(member.getBirthDate())
						.enabled(true)
						.build();
				memberRepo.save(memberNew);
				System.out.println("new member registered");
				return ResponseEntity.ok().body("new member registered");
			}
		} catch (Exception e) {
			System.out.println("Exception: " + e.getMessage());
			return ResponseEntity.badRequest().body("Exception: " + e.getMessage());
		}
	}

	public ResponseEntity<?> addMember1(String id, String password, int birthDate, String username){
		if(memberRepo.existsById(id)) {
			System.out.println("member existed");
			return ResponseEntity.ok().body("member existed");
		}
		try {
			memberRepo.save(Member.builder()
					.id(id)
					.username(username)
					.password(encoder.encode(password))
					.enabled(true)
					.birthDate(birthDate).build());
			System.out.println("join ok");
			return ResponseEntity.ok().body("join ok");
		} catch (Exception e) {
			System.out.println("Exception: " + e.getMessage());
			return ResponseEntity.badRequest().body("Exception: " + e.getMessage());
		}
	}

	public ResponseEntity<?> updateMember(Member member) {
		try {
			Member m = memberRepo.findById(member.getId()).get();
			if (member.getUsername() != null)
				m.setUsername(member.getUsername());
			if (member.getPassword() != null)
				m.setPassword(encoder.encode(member.getPassword()));
			memberRepo.save(m);
			return ResponseEntity.ok().body("member updated");
		} catch (Exception e) {
			System.out.println("Exception: " + e.getMessage());
			return ResponseEntity.badRequest().body("Exception: " + e.getMessage());
		}
	}

	public ResponseEntity<?> updateMember1(UserDetails user, String username, String password,
			int birthDate){
		try {
			Member m = memberRepo.findById(user.getUsername()).get();
			if(username != null) m.setUsername(username);
			if(password != null) m.setPassword(encoder.encode(password));
			m.setBirthDate(birthDate);
			memberRepo.save(m);
			return ResponseEntity.ok().body("member updated");
		} catch (Exception e) {
			System.out.println("Exception: " + e.getMessage());
			return ResponseEntity.badRequest().body("Exception: " + e.getMessage());
		}
	}

	public ResponseEntity<?> deleteMember(String id) {
		try {
			Member member = memberRepo.findById(id).get();
			memberRepo.delete(member);
			List<Board> list = boardRepo.findByWriter(member.getUsername());
			for(Board b : list) {
				boardRepo.delete(b);
			}
			return ResponseEntity.ok().body("member deleted");
		} catch (Exception e) {
			System.out.println("Exception: " + e.getMessage());
			return ResponseEntity.badRequest().body("Exception: " + e.getMessage());
		}
	}

	public ResponseEntity<?> deleteMember(UserDetails user){
		memberRepo.deleteById(user.getUsername());
		return ResponseEntity.ok().body("member deleted");
	}
}
