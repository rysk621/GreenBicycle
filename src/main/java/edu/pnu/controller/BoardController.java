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
import org.springframework.web.bind.annotation.RestController;

import edu.pnu.domain.Board;
import edu.pnu.service.BoardService;

@RestController
public class BoardController {
	@Autowired
	private BoardService boardService;

	@GetMapping("/board")
	public ResponseEntity<?> getBoardList() {
		return ResponseEntity.ok(boardService.getBoardList());
	}

	@GetMapping("/board/member/{writer}")
	public ResponseEntity<?> getBoard(@PathVariable String writer) {
		return ResponseEntity.ok(boardService.getBoard(writer));
	}

//	@GetMapping("/board/title")
//	public ResponseEntity<?> getBoardTitle(@RequestParam String title) {
//		return ResponseEntity.ok(boardService.getBoardByTitle(title));
//	}

	@GetMapping("/board/title")
	public ResponseEntity<?> getBoardBoard(@RequestBody Board board) {
		return ResponseEntity.ok(boardService.getBoardByBoard(board));
	}

	@GetMapping("/board/{seq}")
	public ResponseEntity<?> getBoardDetail(@PathVariable Long seq){
		return ResponseEntity.ok(boardService.getBoardDetail(seq));
	}

	@PostMapping("/member/board")
	public ResponseEntity<?> insertBoard(@AuthenticationPrincipal UserDetails user,
			@RequestBody Board board) {
		return ResponseEntity.ok(boardService.insertBoard(user, board));
	}

	@PutMapping("/member/board")
	public ResponseEntity<?> updateBoard(@AuthenticationPrincipal UserDetails user, @RequestBody Board board) {
		System.out.println("update controller");
		return ResponseEntity.ok(boardService.updateBoard(user, board));
	}

	@DeleteMapping("/member/board/{seq}")
	public ResponseEntity<?> deleteBoard(@AuthenticationPrincipal UserDetails user, @PathVariable Long seq) {
		System.out.println("delete controller");
		return ResponseEntity.ok(boardService.deleteBoard(user, seq));
	}
}
