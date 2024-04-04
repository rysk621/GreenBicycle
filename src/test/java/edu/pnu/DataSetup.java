package edu.pnu;

import java.util.Random;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import edu.pnu.domain.Board;
import edu.pnu.domain.Member;
import edu.pnu.domain.RoadInfo;
import edu.pnu.domain.Role;
import edu.pnu.persistence.BoardRepository;
import edu.pnu.persistence.MemberRepository;
import edu.pnu.persistence.RoadInfoRepository;

@SpringBootTest
public class DataSetup{

	@Autowired
	private MemberRepository memberRepo;
	
	@Autowired
	private BoardRepository boardRepo;
	
	@Autowired
	private RoadInfoRepository roadInfoRepo;

	@Autowired
	private PasswordEncoder encoder;

	@Test
	public void memberInitialize() {
		for(int i = 1; i <= 5; i++) {
			memberRepo.save(Member.builder().id("member" + i + "@email.com").username("member" + i).password(encoder.encode("1234")).enabled(true).build());			
		}
		memberRepo.save(Member.builder().id("admin@email.com").username("admin").password(encoder.encode("abcd")).role(Role.ROLE_ADMIN).enabled(true).build());
	}

	@Test
	public void boardInitialize() {
		Random rd = new Random();
		for(int i = 1; i <= 5; i++)
			boardRepo.save(Board.builder().title("title " + i).content("content " + i).writer("member" + (i%2 + 1)).cnt(rd.nextLong(51)).build());
	}

	@Test
	public void meritInitialize() {
		for(int i = 1; i <= 5; i++)
			roadInfoRepo.save(RoadInfo.builder().roadname("road" + i).lev(i).build());
	}
}
