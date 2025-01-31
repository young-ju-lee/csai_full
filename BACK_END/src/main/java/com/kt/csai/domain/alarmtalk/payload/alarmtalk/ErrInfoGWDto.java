package com.kt.csai.domain.alarmtalk.payload.alarmtalk;
	
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import javax.persistence.Column;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
	
@Data
public class ErrInfoGWDto {
    
	@JsonProperty("tel_Num")
	private String telNum = "";
	
	@JsonProperty("folder_nm")
	private String fldNm;
	      
	@JsonProperty("workflow_nm")
	private String wfwNm;
	       
	@JsonProperty("session_nm")
	private String sesNm;
    
	@JsonProperty("start_dt")
	private String stDt;
	
	@JsonProperty("end_dt")
	private String edDt;
	
	@JsonProperty("seq")
	private String seq;
	
    @JsonProperty("err_cd")
    private String errCd;

    @JsonProperty("err_msg")
    private String errMsg;

}