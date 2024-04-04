package edu.pnu.dto;

import java.util.Date;

import edu.pnu.domain.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BoardDTO {

	private Long seq;
	private String title;
	private String content;
	private String writer;
	private Long cnt;
	private Date regiDate;
	private Category cate;
}
