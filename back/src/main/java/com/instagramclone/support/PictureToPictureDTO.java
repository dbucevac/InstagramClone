package com.instagramclone.support;

import java.util.ArrayList;
import java.util.List;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.instagramclone.dto.PictureDTO;
import com.instagramclone.model.Picture;

@Component
public class PictureToPictureDTO implements Converter<Picture, PictureDTO>{

	@Override
	public PictureDTO convert(Picture source) {
		// TODO Auto-generated method stub
		PictureDTO retValue = new PictureDTO();
		retValue.setId(source.getId());
		retValue.setFileName(source.getFileName());
		retValue.setFileType(source.getFileType());
		retValue.setData(source.getData());
		
		return retValue;
	}
	
	public List<PictureDTO> convert(List<Picture> pictures){
		List<PictureDTO> ret = new ArrayList<PictureDTO>();
		
		for(Picture picture: pictures) {
			ret.add(convert(picture));
		}
		
		return ret;
	}

}
