package com.simpleserver.rest.jersey;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;


@Path("/GlobalChartData/data")
public class MockGlobalChartData {
	
	@GET
	@Path("/get")
	@Produces(MediaType.APPLICATION_JSON)
	public String getDealerData(){
		String fileName = "/Users/sudhakar/Downloads/Output/AllDealerDataStd.json/AllDealerDataStd.json";
		    BufferedReader br = null;

			try {
				br = new BufferedReader(new FileReader(fileName));
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	        String line = null;
		    try {
				try {
					line = br.readLine();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

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

		    	//System.out.println(DealerTime.size());
		    } finally {
		        try {
					br.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		    }
			return line;

			//return DealerTime;
		}
		
}

