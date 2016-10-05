package com.simpleserver.rest.jersey;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

import javax.ws.rs.Consumes;

import org.json.JSONException;
import org.json.JSONObject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/UserAverages/data")
public class MockUserAverages {

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public String getDealerData(String name) throws JSONException, IOException {
		String fileName = "/Users/sudhakar/Downloads/Output/UserAverages.json/UserAverages.json";
		BufferedReader br = null;
		try {
			br = new BufferedReader(new FileReader(fileName));
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.out.println("Request Body"+name);
		}
		String line = null;
		String returnValue = null;
		try {
			while (br.ready()) {
				try {
					line = br.readLine();
					JSONObject jObj = new JSONObject(name);
					String User = jObj.getString("userID");
					if (line.contains("{\"User\":"+User+",")){
						returnValue = line;
						System.out.println("Found"+returnValue);
						break;
					}

				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}

		} finally {
			try {
				br.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return returnValue;
	}
}
