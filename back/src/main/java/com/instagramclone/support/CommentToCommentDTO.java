package com.instagramclone.support;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.instagramclone.dto.CommentDTO;
import com.instagramclone.model.Comment;

@Component
public class CommentToCommentDTO implements Converter<Comment, CommentDTO>{

	@Override
	public CommentDTO convert(Comment source) {
		// TODO Auto-generated method stub
		CommentDTO retValue = new CommentDTO();
		retValue.setId(source.getId());
		retValue.setMessage(source.getMessage());
		
		return retValue;
	}

}
