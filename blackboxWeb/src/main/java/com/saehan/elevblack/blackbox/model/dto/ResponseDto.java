package com.saehan.elevblack.blackbox.model.dto;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ResponseDto {

    public String code;
    public Object data;
    public String message;

    public ResponseDto(Object data,String message){
        this.data = data;
        this.code = "1";
        this.message = message;
    }

        public ResponseDto(String code, String message) { // 생성자 (오류 처리)
        this.data = null;
        this.code = code;
        this.message = message;
    }

    public ResponseDto(String message) { // 생성자 (데이터 삭제 성공 처리)
        this.data = null;
        this.code = "1";
        this.message = message;
    }


    public ResponseEntity<ResponseDto> wrap() { // ResponseEntity로 wrapping하는 메소드

        ResponseEntity<ResponseDto> res = new ResponseEntity<>(HttpStatus.OK);
        res = ResponseEntity.ok(this);

        return res;
    }

}