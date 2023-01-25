package com.saehan.elevblack.blackbox.util;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;

import javax.net.ssl.HttpsURLConnection;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.json.simple.JSONObject;

@Slf4j
@Component
public class NeonUtil {

//     public static String getData(String elevno) throws IOException{

//         URL url = new URL ("http://apis.data.go.kr/openapi/service/ElevatorInformationService/getElevatorView?serviceKey=Sq%2BreJw%2BwOscsNbCV%2FcTaata1wXyMxk%2F2iLYufllgw%2FTNGvm37bVk1Ek1n5birNrfAxOcTkjGHUiWZEQVV0G5A%3D%3D&elevator_no=0007001");

//         HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();
//         connection.setRequestMethod("GET");
// //        connection.setRequestProperty("Ocp-Apim-Subscription-Key", subscriptionKey);
//         connection.setDoOutput(true);      
//         StringBuilder response = new StringBuilder ();
//         BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));  
//         String line;
//         while ((line = in.readLine()) != null) {
//         response.append(line);
//         }
//           in.close();
//         return response.toString();
//     }
static String urlStr = "https://fcm.googleapis.com/fcm/send";
static String authorization = "key=AAAAVojycEA:APA91bH51dSoED0221PUeqFvHQHHlhU2PYx4XQ-JfNbFuEK2jZB146JkxSogBCur1N55dtCBPeZvHzX4Cm6chgmkV_x4UPEaXjf52QuZYzjtNMf6N0Obm9rtB24F9ieCKbeWhgltluit";

public static void sendFcmTarget(String token,String title,String content){
      
     //       String token = "보낼 타겟의 토큰을 입력하세요";
            String data = "\"data\" : {\r\n"
                    + "  \"seq\" : \"\",\r\n"
                    + "  \"title\" : \""+title+"\",\r\n"
                    + "  \"message\" : \""+content+"\"\r\n" + " }"; 

            URL url = null;
            HttpURLConnection connection = null;
            BufferedOutputStream bos = null;
            BufferedReader reader = null;

            try {
                url = new URL(urlStr);
                
                connection = urlStr.startsWith("https://") ? (HttpsURLConnection) url.openConnection(): (HttpURLConnection) url.openConnection();
                connection.setRequestProperty("Content-Type", "application/json; charset=utf-8");
                connection.setRequestProperty("cache-control", "no-cache");
                connection.setRequestProperty("Authorization", authorization);

                connection.setDoOutput(true);
                connection.setDoInput(true);

                connection.connect();

                bos = new BufferedOutputStream(connection.getOutputStream());

                String message = "{\"to\" : \"" + token + "\"," + data + "," + "\"priority\" :"+ "\"high\"" + "}";
                bos.write(message.getBytes("UTF-8"));
            
                bos.flush();
                bos.close();

                int responseCode = connection.getResponseCode();
                String responseMessage = connection.getResponseMessage();
                StringBuffer buffer = null;
                if (responseCode == HttpURLConnection.HTTP_OK) {

                    buffer = new StringBuffer();
                    reader = new BufferedReader(new InputStreamReader(connection.getInputStream(), "UTF-8"));
                    String temp = null;
                    while ((temp = reader.readLine()) != null) {
                        buffer.append(temp);
                    }
                    reader.close();
                }
                connection.disconnect();
                System.out.println(String.format("Response : %d, %s", responseCode, responseMessage));
                System.out.println("Response DATA : ");
                System.out.println(buffer == null ? "NULL " : buffer.toString());
            } catch (IOException e) {
                e.printStackTrace();
            }
            }
    
            public  void sendAll(String title,String content)
            {
    
                URL url = null;
                HttpURLConnection connection = null;
                BufferedOutputStream bos = null;
                BufferedReader reader = null;

                try {

                    String data ="\"data\" : {\r\n"
                            + "  \"title\" : \""+title+"\",\r\n"
                            + "  \"message\" : \""+ content+"\" \r\n" + " }";

                    log.info("data:",data);
                    url = new URL(urlStr);
                    
                    connection = urlStr.startsWith("https://") ? (HttpsURLConnection) url.openConnection(): (HttpURLConnection) url.openConnection();
                    connection.setRequestProperty("Content-Type", "application/json; charset=utf-8");
                    connection.setRequestProperty("cache-control", "no-cache");
                    connection.setRequestProperty("Authorization", authorization);
        
                    connection.setDoOutput(true);
                    connection.setDoInput(true);
        
                    connection.connect();
        
                    bos = new BufferedOutputStream(connection.getOutputStream());
                    String message = "{\"to\" : \"" + "/topics/all_push" + "\"," + data + "," + "\"priority\" :"+ "\"high\"" + "}";
                    bos.write(message.getBytes("UTF-8"));
                    System.out.println(message);
        
                    bos.flush();
                    bos.close();
        
                    int responseCode = connection.getResponseCode();
                    String responseMessage = connection.getResponseMessage();
                    StringBuffer buffer = null;
                    if (responseCode == HttpURLConnection.HTTP_OK) {
        
                        buffer = new StringBuffer();
                        reader = new BufferedReader(new InputStreamReader(connection.getInputStream(), "UTF-8"));
                        String temp = null;
                        while ((temp = reader.readLine()) != null) {
                            buffer.append(temp);
                        }
                        reader.close();
                    }
                    connection.disconnect();
                    
                    System.out.println(String.format("Response : %d, %s", responseCode, responseMessage));
                    System.out.println("Response DATA : ");
                    System.out.println(buffer == null ? "NULL " : buffer.toString());
                } catch (IOException e) {
                    log.info("fcm error:",e.toString());
                    e.printStackTrace();
                }

            }

            public final static String AUTH_KEY_FCM = "AAAAVojycEA:APA91bH51dSoED0221PUeqFvHQHHlhU2PYx4XQ-JfNbFuEK2jZB146JkxSogBCur1N55dtCBPeZvHzX4Cm6chgmkV_x4UPEaXjf52QuZYzjtNMf6N0Obm9rtB24F9ieCKbeWhgltluit";
            public static void SendFcm(String fcmtoken,String title,String content) throws Exception{

                //String token = tokenList.get(count).getDEVICE_ID();
        
                String _title = "앱 알림";
                String _body = "푸쉬메시지가 도착했습니다.";
                String _actionType = "new";
                String _code = "test";
                //String _token = "/topics/ALL"; // 전체
        
                // 모바일기기에서 얻음
                String _token = "cA_6ynSAQ4WmwMj0suy_fv:APA91bFnl6dIfG1WfYt_BGdzj8sbu62-1fLF96tdPd9NQNgMOvKlVJE_JlMMTpOSMrw6KI0IkEjZ5ycIu0cNtC3bkztxQqqvgP1XeVqoYCeMS3jhPU2Ho8B9bwN7_Su-Jb92a8anPkxY"; // 개인
        
        
                final String apiKey = AUTH_KEY_FCM;
                URL url = new URL("https://fcm.googleapis.com/fcm/send");
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setDoOutput(true);
                conn.setRequestMethod("POST");
                conn.setRequestProperty("Content-Type", "application/json");
                conn.setRequestProperty("Authorization", "key=" + apiKey);
        
                conn.setDoOutput(true);
        
        
                JSONObject json = new JSONObject();
                JSONObject notification = new JSONObject();
        
                notification.put("title", title);
                notification.put("body", content);
        
                json.put("notification", notification);
                json.put("to", fcmtoken);
        
                String sendMsg = json.toString();
        
                OutputStream os = conn.getOutputStream();
        
                // 서버에서 날려서 한글 깨지는 사람은 아래처럼  UTF-8로 인코딩해서 날려주자
                //os.write(input.getBytes("UTF-8"));
                os.write(sendMsg.getBytes("UTF-8"));
                os.flush();
                os.close();
        
                int responseCode = conn.getResponseCode();
                System.out.println("\nSending 'POST' request to URL : " + url);
                System.out.println("Response Code : " + responseCode);
        
                BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                String inputLine;
                StringBuffer response = new StringBuffer();
        
                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
                in.close();
                // print result
                System.out.println(response.toString());
            }
      
}
