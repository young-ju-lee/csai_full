package com.kt.csai.domain.alarmtalk.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.kt.csai.domain.alarmtalk.payload.alarmtalk.TroubleDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Table(name = "tb_gw_log")
@Entity
@Builder
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AlarmTalkSendGW implements Serializable {
	private static final long serialVersionUID = -8009065842904999576L;
	
	@Id
	@Column(name = "seq")
	private String seq = "";
	
	@Column(name = "folder_nm")
	private String fldNm = "";
	
	@Column(name = "workflow_nm")
	private String wfwNm = "";
	
	@Column(name = "session_nm")
	private String sesNm = "";
	
	@Column(name = "start_dt") //현재시간 
	Timestamp stDt = new Timestamp(System.currentTimeMillis());
	
	@Column(name = "end_dt") //현재시간 
	Timestamp edDt = new Timestamp(System.currentTimeMillis());

	@Column(name = "err_cd")
	private String errCd = "";
	
	@Column(name = "err_msg")
	private String errMsg = "";
	
	public void errCd() {
		this.errCd = "3";
	}
	
	public void errMsg() {
		this.errMsg = "Failed";
	}
	
	public void init() {
		this.errCd = "";
		this.errMsg = "";
	}

}
