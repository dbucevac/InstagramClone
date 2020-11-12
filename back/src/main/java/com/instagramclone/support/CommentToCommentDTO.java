package com.instagramclone.support;

import java.util.ArrayList;
import java.util.List;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.instagramclone.dto.CommentDTO;
import com.instagramclone.dto.LikeDTO;
import com.instagramclone.model.Comment;
import com.instagramclone.model.Like;

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
	
	public List<CommentDTO> convert(List<Comment> comments){
		List<CommentDTO> ret = new ArrayList<CommentDTO>();
		
		for(Comment comment: comments) {
			ret.add(convert(comment));
		}
		
		return ret;
	}

}
