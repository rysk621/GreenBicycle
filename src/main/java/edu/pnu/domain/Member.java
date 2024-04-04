package edu.pnu.domain;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Member {

	@Id
	private String id;
	private String username;
	private String password;
	@Builder.Default
	@Enumerated(EnumType.STRING)
	private Role role = Role.ROLE_MEMBER;
	private boolean enabled;
	@Builder.Default
	private Date createDate = new Date();
	private Integer birthDate;
}
