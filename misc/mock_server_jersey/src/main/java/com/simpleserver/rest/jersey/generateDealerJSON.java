package com.simpleserver.rest.jersey;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.simpleserver.data.model.DealerResponseTime;

@Path("/AgentResponse/data")
public class generateDealerJSON {
	
//	@GET
//	@Path("/get")
//	@Produces(MediaType.APPLICATION_JSON)
//	public ArrayList<DealerResponseTime> getDealerData(){
//		String fileName = "/Users/sudhakar/Downloads/AgentAvgResponseTime-2.csv";
//		    BufferedReader br = null;
//
//	        ArrayList<DealerResponseTime> DealerTime = new ArrayList<DealerResponseTime>();
//			try {
//				br = new BufferedReader(new FileReader(fileName));
//			} catch (FileNotFoundException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//		    try {
//		        String line = null;
//				try {
//					line = br.readLine();
//				} catch (IOException e) {
//					// TODO Auto-generated catch block
//					e.printStackTrace();
//				}
//
//		        while (line != null) {
//		        	DealerResponseTime dt = new DealerResponseTime();
//		        	dt.setDealerID(Integer.parseInt(line.split(",")[0]));
//		        	dt.setResponseTime(Integer.parseInt(line.split(",")[1]));
//		            DealerTime.add(dt);
//		            try {
//						line = br.readLine();
//					} catch (IOException e) {
//						// TODO Auto-generated catch block
//						e.printStackTrace();
//					}
//		        }
//
//		    	System.out.println(DealerTime.size());
//		    } finally {
//		        try {
//					br.close();
//				} catch (IOException e) {
//					// TODO Auto-generated catch block
//					e.printStackTrace();
//				}
//		    }
//
//			return DealerTime;
//		}
		
}

