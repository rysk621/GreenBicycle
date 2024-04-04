package edu.pnu.domain;

import java.util.Date;
import java.util.HashSet;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Board {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long seq;
	private String title;
	private String writer;
	private String writerId;
	private String content;
	private HashSet<String> tags;
	@Builder.Default
	private Date regiDate = new Date();
	private Date upDate;
	@Builder.Default
	private Long cnt = 0L;
	@Builder.Default
	@Enumerated(EnumType.STRING)
	private Category cate = Category.CATE1;
}
