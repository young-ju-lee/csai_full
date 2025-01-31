package com.kt.csai.domain.alarmtalk.repository;
	
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
	
import com.kt.csai.domain.alarmtalk.entity.AlarmTalkId;
import com.kt.csai.domain.alarmtalk.entity.AlarmTalkSendGW;
	
@Repository
public interface AlarmTalkRepositoryGW extends JpaRepository<AlarmTalkSendGW, AlarmTalkId> {

		@Query(value =                                  
	                "SELECT                                 " +     
	                "      A.folder_nm,                     " + 
	                "      A.workflow_nm,                   " + 
	                "      A.session_nm,                    " + 
	                "      A.seq,                           " +
	                "      A.rework_yn,                     " + 
	                "      A.err_cd,                        " + 
	                "      A.err_msg,                       " + 
	                "      A.work_dt                        " +
	                "  FROM tb_gw_log A                     " +             
	                " WHERE 1=1                             " +
	                "   and work_dt= :workDt                " +
	                " ORDER BY A.work_dt DESC               " +
	                " limit 50                              "
	        , nativeQuery = true)
	        public List <AlarmTalkSendGW> getAlarmTalkSndHistList(                                                                  
	                        @Param("workDt") String workDt ); 
	        
	     @Query(value =                                        
	                "SELECT count(*) AS cnt  " +
	                "  FROM tb_gw_log 					   " +
	                " WHERE 1 = 1 						   " +
	                " limit 1                               "
	        , nativeQuery = true)
	        public String findByCnt();
	     
	    /* tb_gw_log 테이블 삭제  */
	    void deleteByerrCd(String errCd);
	     
	}