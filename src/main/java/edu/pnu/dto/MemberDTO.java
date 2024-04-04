package edu.pnu.dto;

import edu.pnu.domain.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MemberDTO {
	private String id;
	private String username;
	private Role role;
	private Integer birthDate;
}
