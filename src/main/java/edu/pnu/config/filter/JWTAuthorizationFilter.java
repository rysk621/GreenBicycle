package edu.pnu.config.filter;

import java.io.IOException;
import java.util.Optional;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import edu.pnu.domain.Member;
import edu.pnu.persistence.MemberRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JWTAuthorizationFilter extends OncePerRequestFilter {
	private final MemberRepository memberRepo;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// 요청 헤더에서 Authorization을 얻어온다.
		String authToken = request.getHeader("Authorization");
		// 없거나 "Bearer "로 시작하지 않으면 필터 통과
		if (authToken == null || !authToken.startsWith("Bearer ")) {
			filterChain.doFilter(request, response);
			return;
		}
		// 토큰에서 "Bearer " 제거
		String jwtToken = authToken.replace("Bearer ", "");

		// 토큰에서 username 추출
		String username = JWT.require(Algorithm.HMAC256("edu.pnu.jwt")).build().verify(jwtToken).getClaim("username").asString();
		System.out.println(username); // Member id

		// 토큰에서 얻은 username으로 DB에서 사용자 검색
		Optional<Member> opt = memberRepo.findById(username);
		// 사용자가 존재하지 않으면 필터 통과
		if(!opt.isPresent()) {
			filterChain.doFilter(request, response);
			return;
		}

		// DB에서 읽은 사용자 정보를 이용, UserDetails 타입의 객체 생성
		Member member = opt.get();
		User user = new User(member.getId(), member.getPassword(), AuthorityUtils.createAuthorityList(member.getRole().toString()));

		// Authentication 객체를 생성 : 사용자명과 권한 관리 위한 정보 입력(암호는 필요하지 않음)
		Authentication auth = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
	
		// security session에 등록
		SecurityContextHolder.getContext().setAuthentication(auth);

		filterChain.doFilter(request, response);
	}

}
