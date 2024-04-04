package edu.pnu.service;

import java.util.Date;

import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import edu.pnu.domain.Board;
import edu.pnu.domain.Member;
import edu.pnu.dto.BoardDTO;
import edu.pnu.persistence.BoardRepository;
import edu.pnu.persistence.MemberRepository;

@Service
public class BoardService {
	private final MemberRepository memberRepo;
	private final BoardRepository boardRepo;
	public BoardService(MemberRepository memberRepo, BoardRepository boardRepo) {
		this.memberRepo = memberRepo;
		this.boardRepo = boardRepo;
	}

	public ResponseEntity<?> getBoardList(){
		return ResponseEntity.ok().body(boardRepo.findAll(Sort.by(Sort.Direction.DESC, "seq")));
	}

	public ResponseEntity<?> getBoard(String writer) {
		try {
			return boardRepo.findByWriter(writer).isEmpty()
					? ResponseEntity.badRequest().body("no such member")
							: ResponseEntity.ok().body(boardRepo.findByWriterContains(writer));
		} catch (Exception e) {
			System.out.println("Exception: " + e.getMessage());
			return ResponseEntity.badRequest().body("Exception: " + e.getMessage());
		}
	}

	public ResponseEntity<?> getBoardByTitle(String title) {
		try {
			System.out.println(title);
			return boardRepo.findByTitleContains(title).isEmpty()
					? ResponseEntity.badRequest().body("no such list")
							: ResponseEntity.ok().body(boardRepo.findByTitleContains(title));
		} catch (Exception e) {
			System.out.println("Exception: " + e.getMessage());
			return ResponseEntity.badRequest().body("Exception: " + e.getMessage());
		}
	}

	public ResponseEntity<?> getBoardByBoard(Board board) {
		try {
			System.out.println("\"" + board.getTitle() + "\" has been selected");
			return boardRepo.findByTitleContains(board.getTitle()).isEmpty()
					? ResponseEntity.badRequest().body("no such list")
							: ResponseEntity.ok().body(boardRepo.findByTitleContains(board.getTitle()));
		} catch (Exception e) {
			System.out.println("Exception: " + e.getMessage());
			return ResponseEntity.badRequest().body("Exception: " + e.getMessage());
		}
	}

	public ResponseEntity<?> getBoardDetail(Long seq){
		try {
			Board board = boardRepo.findById(seq).get();
			board.setCnt(board.getCnt() + 1);
			boardRepo.save(board);
			BoardDTO boarddto = new BoardDTO(board.getSeq(),
					board.getTitle(),
					board.getContent(),
					board.getWriter(),
					board.getCnt(),
					board.getRegiDate(),
					board.getCate());
			System.out.println("board detail");
			return ResponseEntity.ok().body(boarddto);
		} catch (Exception e) {
			System.out.println("Exception: " + e.getMessage());
			return ResponseEntity.badRequest().body("Exception: " + e.getMessage());
		}
	}

	public ResponseEntity<?> insertBoard(UserDetails user, Board board) {
		try {
			Member member = memberRepo.findById(user.getUsername()).get();
			Board newBoard = Board.builder()
					.title(board.getTitle())
					.content(board.getContent())
					.writer(member.getUsername())
					.writerId(member.getId())
					.cate(board.getCate())
					.build();
			boardRepo.save(newBoard);
			System.out.println("board uploaded");
			return ResponseEntity.ok().body("board uploaded");
		} catch (Exception e) {
			System.out.println("Exception: " + e.getMessage());
			return ResponseEntity.badRequest().body("Exception: " + e.getMessage());
		}
	}

	public ResponseEntity<?> updateBoard(UserDetails user, Board board) {
		try {
			Board findBoard = boardRepo.findById(board.getSeq()).get();
			Member member = memberRepo.findById(user.getUsername()).get();
	
			System.out.println("작성자: " + findBoard.getWriterId());
			System.out.println("접근자: " + member.getId());
			if(findBoard.getWriterId().compareTo(member.getId()) != 0
					&& member.getId().compareTo("admin@email.com") != 0) {
				return ResponseEntity.badRequest().body("작성자가 다릅니다.");
			}

			findBoard.setTitle(board.getTitle());
			findBoard.setContent(board.getContent());
//			findBoard.setCate(board.getCate());
			if(member.getId().compareTo("admin@email.com") != 0) findBoard.setWriter(member.getUsername());
			findBoard.setUpDate(new Date());
			boardRepo.save(findBoard);
			System.out.println("board updated");
			return ResponseEntity.ok().body("board updated");
		} catch(Exception e) {
			System.out.println("Exception: " + e.getMessage());
			return ResponseEntity.badRequest().body("Exception: " + e.getMessage());
		}
	}

	public ResponseEntity<?> deleteBoard(UserDetails user, Long seq) {
		try {
			Board board = boardRepo.findById(seq).get();
			System.out.println(user.getUsername());
			System.out.println(board.getWriterId());
			if(user.getUsername().equals(board.getWriterId())
					|| user.getUsername().compareTo("admin@email.com") == 0) {
				boardRepo.delete(boardRepo.findById(seq).get());				
				System.out.println("board deleted");
				return ResponseEntity.ok().body("board deleted");
			} else {
				System.out.println("wrong writer");
				return ResponseEntity.badRequest().body("작성자가 다릅니다.");
			}
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body("Exception: " + e.getMessage());
		}
	}

//	public ResponseEntity<?> deleteBoard(UserDetails user, Board board){
//		try {
//			boardRepo.deleteById(board.getSeq());
//			System.out.println("delete ok");
//			return ResponseEntity.ok().body("delete ok");
//		} catch(Exception e) {
//			System.out.println("Exception: " + e.getMessage());
//			return ResponseEntity.badRequest().body("Exception: " + e.getMessage());
//		}
//	}
}
